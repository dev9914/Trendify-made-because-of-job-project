import React, { useEffect ,useState} from 'react'
import { Rating } from '@mui/material'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RecentlyViewed = () => {

    const url = import.meta.env.VITE_URL;
    const token = localStorage.getItem("token");
    const [product, setProducts] = useState([])

    const recentProduct = async() => {
        try {
          const response = await axios.get(`${url}/users/product/getrecentviewed`,{
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          })
        //   console.log(response.data.data.recentlyViewed)
          setProducts(response.data.data.recentlyViewed)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{
        recentProduct()
      })

  return (
    <div>
    <div style={{ background: 'black', height:'100vh', }} className='text-white'>
<div style={{height:"100vh"}} className='flex ml-4'>
  <div className='mt-4'>
<Sidebar />
  </div>
<div style={{overflowY:'auto'}} className='ml-4 mt-4'>
<div style={{width:"91vw",minHeight:'96vh',background: 'linear-gradient(to bottom, #171518 0%, #1d181d 80%, #251b25 100%)',border: '0.5px solid rgba(255, 255, 255, 0.123)'}} className=' rounded-md'>
<div className="list mx-12 flex flex-col">
        <h1 className="text-3xl mt-5 font-semibold font-sans">
          List of Recently Viewed Products 
        </h1>
        <div className="flex gap-5 mt-8">
          <button
            style={{ background: "#343434", width: "9vw", height: "6vh" }}
            className="rounded-3xl font-sans font-semibold text-gray-100"
          >
            Recommended
          </button>
          <button
            style={{ background: "#343434", width: "9vw", height: "6vh" }}
            className="rounded-3xl font-sans font-semibold text-gray-400"
          >
            Lower Price
          </button>
          <button
            style={{ background: "#343434", width: "9vw", height: "6vh" }}
            className="rounded-3xl font-sans font-semibold text-gray-400"
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className=" mx-16 mt-10 grid grid-cols-3">
        {product.length >0 ? (

          product.map((item,index)=>(
            <Link key={index} to={`/dashboard/productview/${item._id}`}>
        <div 
          style={{
            width: "20vw",
            height: "50vh",
            backgroundImage:
              `url(${item.productImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // marginTop:"20vh"
          }}
          className="bg-yellow-200 cursor-pointer mb-5 rounded-3xl"
        >
          <div style={{paddingTop:"30vh"}} className="">
          <Rating className="ml-3" name="simple-controlled" value={3} />
          <div className="ml-3 pb-5 font-sans font-semibold mr-5">{item.description}</div>
          <div className="flex justify-around gap-9">
            <p className="text-2xl font-sans font-semibold">₹{item.price}</p>
            <div
              style={{ height: "5vh", width: "6vw" }}
              className=" rounded-3xl bg-neutral-400 flex items-center justify-center"
            >
              <p className="">Shop now</p>
            </div>
          </div>
          </div>
        </div>
            </Link>
          ))
        ):(<div>
          <h1 className='text-white font-sans text-xl font-semibold'> No products viewed yet!</h1>
          </div>)}
      </div>
</div>
</div>
</div>
</div>
</div>
  )
}

export default RecentlyViewed
