import React from 'react';
import Typed from 'react-typed'
import { Glow, GlowCapture } from '@codaworks/react-glow';

const Hero = () => {
    
    return (
    <div className='text-white full bg-gradient-to-b from-black via-[#110D0D] to-[#191414]'>
        <div className='relative max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            {//background animations 
            }
            <div id="blob" className='absolute top-0 -left-4 w-56 h-56 bg-[#1DB954] rounded-full filter blur-xl
            opacity-50 animate-blob pointer-events-none'>""</div>
            <div className='absolute top-20 -right-20 w-56 h-56 bg-[#1DB954] rounded-full filter blur-xl
            opacity-50 animate-blob animation-delay-2000 pointer-events-none'>""</div>
            <div className='absolute -bottom-4 -left-40 w-56 h-56 bg-[#1DB954] rounded-full filter blur-xl
            opacity-50 animate-blob animation-delay-4000 pointer-events-none'>""</div> 
            <div className='absolute bottom-36 -right-40 w-56 h-56 bg-[#1DB954] rounded-full filter blur-xl
            opacity-50 animate-blob animation-delay-4000 pointer-events-none'>""</div> 
            <div className='absolute center w-56 h-56 bg-[#1DB954] rounded-full filter blur-xl
            opacity-50 animate-blob animation-delay-6000 pointer-events-none'>""</div>
            <p className = 'font-bold md:text-2xl sm:text-xl text-lg text-[#1DB954] font-montserrat'> Find the songs you like.</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:pt-6 text-white font-montserrat
                glow:text-glow/50'> 
                Spotify Discover.</h1>
    
            <p className='text-black p-2 md:text-2xl text-xl font-bold dark:text-white'></p> 
        <div className='space-x-4'>
            <GlowCapture>
                <a href='#main' >
                    <Glow color="[#1DB954]">
                    <button className='bg-[#1DB954] w-[200px] rounded-md font-medium my-6 mx-auto py-3  
                    text-black bold glow:text-glow/5 '> 
                     <p className='font-extrabold font-montserrat'> Let's go. </p>
                    </button> 
                    </Glow>
                </a>
            </GlowCapture>
        </div>      
        </div>
    </div>
    )
}

export default Hero