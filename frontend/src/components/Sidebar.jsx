import React from 'react'
import { GoHomeFill } from "react-icons/go";
import Icon from '../assets/meeting.png'
import { CiSearch } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { FiPlusSquare } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";

const Sidebar = () => {

  const url = import.meta.env.VITE_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState('');
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/users/getuserdetails`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log("Response Status:", response.status); // Log response status
      // console.log("Response Headers:", response.headers); // Log response headers

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
        // console.log(result.data.userDetails.role);
      setData(result.data.userDetails.role);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${url}/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log("Response Status:", response.status); // Log response status
      // console.log("Response Headers:", response.headers); // Log response headers

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      localStorage.removeItem('token')
      navigate('/')
      const result = await response.json();
      return result
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = ()=>{
    logout()
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{height:'96vh', width:"6vw",background: 'linear-gradient(to bottom, #171518 0%, #171518 90%, #251b25 100%)',border: '0.5px solid rgba(255, 255, 255, 0.123)'}} className=' rounded-md'>
      <div className='flex items-center gap-7 flex-col mt-3'>
        <p className='cursor-pointer'><img src={Icon} width={30} alt="" /></p>
        <Link to='/dashboard'>
        <p className='cursor-pointer'><GoHomeFill size={20} /></p>
        </Link>
        <p className='cursor-pointer'><CiSearch size={20}/></p>
        <Link to='/dashboard/recentlyviewed'>
        <p className='cursor-pointer'><MdRemoveRedEye size={20} /></p>
        </Link>
        {data ==='seller' && (<>
        <Link to='/dashboard/sellerupload'>
        <p className='cursor-pointer'><FaCartArrowDown size={20} /></p>
        </Link>
          <Link to='/dashboard/createproduct'>
        <p className='cursor-pointer'><FiPlusSquare size={20}/></p>
          </Link>
          </>
        )}
        <p onClick={handleLogout} className='cursor-pointer'><CiLogout size={20}/></p>
      </div>
    </div>
  )
}

export default Sidebar
