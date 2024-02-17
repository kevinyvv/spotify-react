import {useEffect, useState, Fragment, useContext} from 'react';
import axios from 'axios';
import { UridsContext } from './Recommendations';

const Playlist = () => {
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
    const urids = useContext(UridsContext)

  async function makePL(Name, Description, URIList){
    const getid = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    console.log(getid.data.id)
    let ID = getid.data.id
    let response = await axios('https://api.spotify.com/v1/users/' + ID + '/playlists', {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name: Name,
            description: Description
        })
    })
    console.log(response)
    console.log(urids)
    let PLID = response.data.id
    console.log(PLID)
    await axios('https://api.spotify.com/v1/playlists/' + PLID + '/tracks', {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            uris: URIList
        })
    })
    alert("Playlist created sucessfully!")
  }

  return(
    
      <div className='grid justify-center mt-16 space-y-8'>
        <h1 className='sm:text-3xl text-xl font-bold text-white text-center'> Step 3: Save your recommendations</h1>
            {token ?
              <button onClick={() => {makePL("test", "spotify api test", urids.map(i => 'spotify:track:' + i))}}
              className='rounded-3xl bg-transparent py-2 px-2 font-bold text-xl scale-75 sm:scale-100
              hover:scale-105 outline outline-1 hover:outline-2 outline-white text-white'> Create a playlist.
              </button>
                : <h2 className='text-center text-white'> Please login to your Spotify account first. </h2>
              }
        </div>
      
  )
}

export default Playlist;


  