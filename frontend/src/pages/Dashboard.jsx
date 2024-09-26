import React from 'react'
import Sidebar from '../components/Sidebar'
import LandingPage from '../components/LandingPage'

const Dashboard = () => {
  return (
    <div style={{ background: 'black', height:'100vh', }} className='text-white'>
      <div style={{height:"100vh"}} className='flex ml-4 items-center'>
      <Sidebar />
      <div className='ml-4'>
      <LandingPage />
      </div>
      </div>
    </div>
  )
}

export default Dashboard
