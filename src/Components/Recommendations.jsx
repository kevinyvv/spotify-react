
import {useEffect, useState, Fragment, useContext, createContext} from 'react';
import axios from 'axios';
import Playlist from './CreatePlaylist';
import { FaArrowUp } from 'react-icons/fa';
import FadeIn from 'react-fade-in/lib/FadeIn';


export const UridsContext = createContext(null)

const Recs = ({props}) => {
  const [token, setToken] = useState("")

// gets token from local storage by splitting hash at accesstoken value
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])
  
  //options for recommendations
  const [numbe, setNumbe] = useState('10');

  const handleNumbe=(e)=>{
    setNumbe(e.target.value)
  }

  const [reco, setReco] = useState([])
  const [display, setDisplay] = useState(true)
  const [exists, setExists] = useState(false)
  const [displaypl, setDisplaypl] = useState(false)

  async function getRecs(nsongs, trackids){
    console.log(props)
    const {data} = await axios.get(`https://api.spotify.com/v1/recommendations?limit=${nsongs}&seed_tracks=${trackids.join(',')}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(data) 
    setReco(data.tracks)
    console.log(reco?.map(tracks=>tracks.id))
    setDisplay(true)
    setExists(true)
    setDisplaypl(true)
  }

  const renderRecs = () => {
    if (display)
    return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
    { reco?.map(tracks => (
        <div key={tracks.id} className='col-span-1 mx-8 my-8'>
            <span className='flex justify-center space-x-8 mx-16'>
            <img src = {tracks.album.images[2].url} className='rounded-lg mx-8 scale-150 col-span-2 h-2/3 align-middle'/>
            <span className='col-span-1 space-y-4'>
            <p className='font-bold text-white truncate w-80'>{tracks.name} by {tracks.artists[0].name}</p>
            <audio controls src = {tracks.preview_url} className='color-[#1DB954]'> </audio>
            </span>
            {/* add play function*/}
            </span>
        </div> 
    ))}
    </div>
    )
  }

  return(
    <Fragment>
      <div className='grid justify-center mt-16 space-y-8'>
        <h1 className='sm:text-3xl text-xl font-bold text-white text-center'> Step 2: Get recommended tracks (based on Top Songs) </h1>
        {display && exists &&
                <button onClick={() => setDisplay(!display)} className='mx-4 text-white'> (Hide) </button>
              }
              {!display && exists &&
                <button onClick={() => setDisplay(!display)} className='mx-4 text-white'> (Show) </button>
              }
        <span className='flex justify-center'>
        <select onChange={(e)=>handleNumbe(e)} className='col-span-1 scale-75 sm:scale-100 font-bold text-center rounded-lg outline-none 
        bg-[#1DB954] text-black sm:text-xl text-lg
         px-1 py-1'>
                <option selected disabled> # of Recommendations</option>
                <option>10</option>
                <option>20</option>
                <option>40</option>
                <option>50</option>
        </select> 
        </span>
        <span>
            {token ?
              <button onClick={() => {getRecs(numbe, props)}}
              className='rounded-3xl bg-transparent scale-75 sm:scale-100
              py-2 px-2 font-bold text-xl hover:scale-105 font-montserrat
              outline outline-1 hover:outline-2 outline-white text-white'> Generate Recommendations
              </button>
                : <h2 className='text-center text-white'> Please login to your Spotify account first. </h2>
              }
              </span>
              {renderRecs()}
        </div>
      {displaypl 
      ? 
      <FadeIn delay="200" transitionDuration="2000"> 
      <UridsContext.Provider value = {reco?.map(tracks=>tracks.id)}>
            <Playlist/>
        </UridsContext.Provider>
        </FadeIn> 
      : 
      <FadeIn delay="1000" transitionDuration="800"> 
      <FaArrowUp size={40} className='fill-white scale-75 sm:scale-100 lg:scale-150 mt-16 mb-4 mx-auto'/>
      <text className='font-bold text-white text-center'> Click Here. </text> 
      </FadeIn>
      }

        </Fragment>
  )
}

export default Recs;

