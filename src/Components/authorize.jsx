
import {useEffect, useState} from 'react';
import axios from 'axios';



const Authorize = () => {
  const CLIENT_ID = "445063991dde42efbaa3536012567e7d"
  const REDIRECT_URI = "https://kevinyvv.github.io/spotify-react"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPE = "user-top-read, playlist-modify-public, playlist-modify-private, user-read-email, user-read-private"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [used, setUsed] = useState(false)

// gets token from local storage by splitting hash at accesstoken value
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
        setUsed(true)
    }

    setToken(token)

  }, [])
  //logs out by removing token
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    setUsed(false)
}

  

  return (
    <div className="bg-black h-4/5" id="top">
       <div className="flex justify-between">
              <h1 className='text-white font-bold sm:text-2xl text-lg my-4 mx-4'>
                <text className='font-montserrat'> Spotify Discover Whatever Whenever. </text>
                </h1>
{/* checking if an account is linked */}
                {!used && !token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`}
                className='rounded-3xl z-50 bg-white text-black font-montserrat font-bold my-4 mx-4 text-justify py-2 px-4'>Login to Spotify.</a>
                    :<button onClick={logout}
                    className='rounded-lg font-bold font-montserrat w-[100px] bg-[#1DB954] hover:bg-[#2bde6a] my-4 mx-4'> 
                    Logout
                     </button>}         
      </div>
            
    </div>
  );
}

export default Authorize;