import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Searchbar = () => {
  return (
    <div>
      <div style={{background:'#171518', width:'70vw',height:"10vh",}} className='rounded-full'>
        <div style={{height:"8.5vh",border: '0.5px solid rgba(255, 255, 255, 0.123)',width:"69vw",left:'7px',top:"5px"}} className='flex justify-between rounded-full relative'>
            <div className='flex mt-4 ml-5'>
            <CiCirclePlus className='text-gray-400' size={30} />
            <p className='text-gray-400 font-sans font-semibold mt-1 ml-2'>Thank you Coming to our website</p>
            </div>
            <Link to='/dashboard/product/men'>
            <div style={{height:'6vh',width:"6vw"}} className='mr-3 bg-white mt-2 text-black flex rounded-full'>
            <FaMagnifyingGlassPlus className='mt-3 ml-2' size={18} />
            <p className='font-sans font-semibold ml-2 mt-2'>Shop</p>
            </div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Searchbar
