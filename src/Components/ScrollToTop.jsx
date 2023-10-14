import React from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
import {useState} from 'react';
import 'aos/dist/aos.css'

const Top = () => {
    
    const [Display, setDisplay] = useState(window.scrollY > 100 ? true :false);
    
        const check = () =>{
        window.scrollY > 100 ? setDisplay(true) : setDisplay(false)
        }
        window.addEventListener("scroll", check);

    if (Display) {
    return (
        
        <button className="fixed right-24 bottom-24 opacity-25 hover:opacity-100 f" id = "arrow"
        >
            <a href ='#top'>
            <FaArrowAltCircleUp size={40} className='fill-white scale-75 sm:scale-100 lg:scale-125'/>
            </a>
        </button> 
       
    )
    }
  }

  export default Top