import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Authorize from './Components/authorize';
import TopSongs from './Components/TopSongs';
import Main from './Components/mainpage';
import Top from './Components/ScrollToTop'
import Hero from './Components/Hero';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from './Components/Footer';

function App() {
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

  // for errors
  function Fallback({error}) {
    return (
      <div>
        <p>Something went wrong. Reload the page and login again?</p>
      </div>
    )
  }

  return(
    <div>
      <ErrorBoundary
      FallbackComponent={Fallback}>
      <Authorize/>
      <Hero/>
      <Top/>
      <Main/>
      </ErrorBoundary>
    </div>
  )
}

export default App;



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


  