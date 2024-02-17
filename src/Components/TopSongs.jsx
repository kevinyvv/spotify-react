
import {useEffect, useState, createContext, useContext, Fragment} from 'react';
import axios from 'axios';


const TopSongs = (props) => {

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

   // options for time_range and top _ songs
const [range, setRange] = useState('medium_term');

const handleRange=(e)=>{
  if (e.target.value === "All Listening History") {
      setRange('long_term')}
  else if (e.target.value === "Last 6 Months") 
      setRange('medium_term')
  else if (e.target.value === "Last Month")
      {setRange('short_term')}
  else {setRange('medium_term')}
}

const [numba, setNumba] = useState('5');

const handleNumba=(e)=>{
  setNumba(e.target.value)
}

  const [tops, setTops] = useState([])
  const [display, setDisplay] = useState(true)
  const [exists, setExists] = useState(false)

  async function topTracks(timerange, nsongs, offset){
    const {data} = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timerange}&limit=${nsongs}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    const top_songs = data.items.map(({name, artists}) => `${name} by ${artists.map(artist=>artist.name).join(', ')}`)
    let top_songs_id = data.items.map(({id})=> `${id}`)
    props.handleCallback(top_songs_id.slice(0,5))
    setTops(data.items)
    setDisplay(true)
    setExists(true)
  }

  const renderTops = () => {
    if (display)
    return (
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
       { tops.map((items) => (
          <div key={items.id} className='col-span-1 mx-8 my-8'>
            <span className='flex justify-center space-x-8 mx-16'>
              <img src = {items.album.images[2].url} className='rounded-lg mx-8 scale-150 h-2/3 align-middle'/>
              <span className='space-y-2'>
                <p className='font-bold text-white truncate w-80'>{items.name + ' '} by {items.artists[0].name} </p>
                <audio controls src = {items.preview_url} className='color-[#1DB954]'> </audio>
              </span>
            </span>
          </div>
    )
    )}
    </div>
    )
  }

  return(
    <div className='my-4 space-y-12'>
        <span className='grid justify-center space-y-8'> 
        <span className='flex'> <h1 className='sm:text-3xl text-xl font-bold font-montserrat text-white'> Step 1: Get your top songs </h1>
        {display && exists &&
                <button onClick={() => setDisplay(!display)} className='mx-4 text-white'> (Hide) </button>
              }
              {!display && exists &&
                <button onClick={() => setDisplay(!display)} className='mx-4 text-white'> (Show) </button>
              }
        </span>
        <span className='flex justify-center'>
        <select onChange={(e)=>handleRange(e)} className='col-span-1 scale-75 sm:scale-100 w-full font-bold text-center rounded-lg outline-none 
        bg-[#1DB954] text-black sm:text-xl text-lg font-montserrat
        sm:mr-4 px-1 py-1'>
                <option selected disabled> Range </option>
                <option>All Listening History</option>
                <option>Last 6 Months</option>
                <option>Last Month</option>
        </select> 
        <select onChange={(e)=>handleNumba(e)} className='col-span-1 scale-75 sm:scale-100 w-full font-bold text-center rounded-lg outline-none 
        bg-[#1DB954] text-black sm:text-xl text-lg font-montserrat
        sm:ml-4 px-1 py-1'>
                <option selected disabled> # of Songs </option>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
        </select> 
        </span>
            {token ?
              <button onClick={
                () => {try {topTracks(range, numba, 0)}
              catch(e) {
                alert('an error has occured. reload the page and login again?')
              }}
              }
              className='rounded-3xl bg-transparent scale-75 sm:scale-100
              py-2 px-2 font-bold text-xl hover:scale-105 font-montserrat
              outline outline-1 hover:outline-2 outline-white text-white'> Get Top Songs
              </button>
                : <h2 className='text-center text-white font-montserrat'> Please login to your Spotify account first. </h2>
              }
        </span>
          {renderTops()}
        </div>
  )
}

export default TopSongs;



/*
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("http://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
  }
  */


  //hover:bg-[#2bde6a]