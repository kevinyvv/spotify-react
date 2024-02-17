
import {useEffect, useState} from 'react';
import TopSongs from './TopSongs';
import Recs from './Recommendations';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { FaArrowUp } from "react-icons/fa";
import Footer from './Footer';

const Main = () => {
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

  
const [datatopass, setDataToPass] = useState([])
const [displayrec, setDisplayrec] = useState(false)
const [recstopass, setRecsToPass] = useState([])
const [displaypl, setDisplaypl] = useState(true)

  function CallBack (childData) {
    setDataToPass(Array.from(childData))
    setDisplayrec(true)
  }

  return(
    <div id="main" className='w-full mt-[-96px] h-full mx-auto text-center font-montserrat grow'>
      <TopSongs handleCallback={CallBack}/>
      {displayrec ? <FadeIn delay="200" transitionDuration="2000"> <Recs props={datatopass}/> </FadeIn> 
      : <FadeIn delay="1000" transitionDuration="800"> <FaArrowUp size={40} className='fill-white scale-75 sm:scale-100 lg:scale-150 mt-16 mb-4 mx-auto'/>
      <text className='font-bold text-white text-center'> Click Here. </text> 
      </FadeIn>
      }
      <Footer/>
    </div>
  )
}

export default Main;




  