import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import axios from 'axios'

const LandingPage = () => {
    const url = import.meta.env.VITE_URL
    const token = localStorage.getItem('token')
    const [data, setData] = useState('')

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/users/getuserdetails`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // console.log('Response Status:', response.status); // Log response status
    // console.log('Response Headers:', response.headers); // Log response headers


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data.userDetails);
      } catch (error) {
        console.log(error);
      }
    };

    const becomeSeller = async() => {
      try {
        const response = await axios.patch(`${url}/seller/becomeseller`,{},{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        console.log(response)
        alert('Congratulations Now you a Seller')
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }

    const handlebecomeseller = ()=> {
      becomeSeller()
    }
  

    useEffect(()=>{
      fetchData()
    },[])

  return (
    <div style={{height:'96vh', width:"91vw",background: 'linear-gradient(to bottom, #171518 0%, #1d181d 80%, #251b25 100%)',border: '0.5px solid rgba(255, 255, 255, 0.123)'}} className=' rounded-md'>
      <div className='m-9'>
      <h1 style={{color:"#9642a2"}} className='text-3xl font-sans mb-2 font-semibold '>
      Hello, {data.fullname}
      </h1>
      <h1 className='text-3xl font-sans font-semibold text-gray-500'>How can i help you today?</h1>
      <div className='flex'>
      {data.role ==='buyer' &&
      (<>
        <h1 className='text-3xl font-sans font-semibold text-gray-500'>Want to become Seller?</h1>
      <h1 style={{width:"6vw"}} className='text-md pl-2 pt-1 font-sans font-semibold bg-white rounded-full text-black ml-4 cursor-pointer' onClick={handlebecomeseller}>Click here</h1>
      </>
      )}
      </div>
      <div className='flex gap-5 mt-14'>
        <Link to='/dashboard/product/men'>
      <div style={{width:'19vw', height:"25vh",background:"#343434"}} className=' rounded-3xl'>
        <p className='text-2xl font-sans text-gray-200 font-semibold m-5'>
          Tranding clothes for men 2024
        </p>
      </div>
        </Link>
      <Link to='/dashboard/product/women'>
      <div style={{width:'19vw', height:"25vh",background:"#343434"}} className=' rounded-3xl'>
        <p className='text-2xl font-sans text-gray-200 font-semibold m-5'>
          Tranding clothes for women 2024
        </p>
      </div>
      </Link>
      <Link to='/dashboard/product/kids'>
      <div name='kids' style={{width:'19vw', height:"25vh",background:"#343434"}} className=' rounded-3xl'>
        <p className='text-2xl font-sans text-gray-200 font-semibold m-5'>
          Tranding clothes for kids 2024
        </p>
      </div>
      </Link>
      </div>
      <div className='absolute ml-24 bottom-8 flex items-center'>
      <Searchbar />
      </div>
      </div>
    </div>
  )
}

export default LandingPage
