import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Rating } from "@mui/material";
import Searchbar from "./Searchbar";

const Product = () => {
  const { category } = useParams();
  const url = import.meta.env.VITE_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/users/getproducts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
        }),
      });

      // console.log("Response Status:", response.status); // Log response status
      // console.log("Response Headers:", response.headers); // Log response headers

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      //   console.log(result.data.products);
      setData(result.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{ background: "black", height: "100vh" }}
      className="text-white"
    >
      <div style={{ height: "100vh" }} className="flex ml-4">
        <div className="mt-4">
        <Sidebar />
        </div>
        <div style={{overflowY:'auto'}} className="ml-4 mt-4">
          <div
            style={{
              minHeight: "96vh",
              width: "91vw",
              background:
                "linear-gradient(to bottom, #171518 0%, #1d181d 80%, #251b25 100%)",
              border: "0.5px solid rgba(255, 255, 255, 0.123)",
            }}
            className=" rounded-md"
          >
            <div className="m-12 flex flex-col">
              <h1 className="text-3xl font-semibold font-sans">
                List of Tranding {category} T-shirt
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

            <div className="m-14 grid grid-cols-3">
                {data.map((item,index)=>(
                  <Link key={index} to={`/dashboard/productview/${item._id}`}>
              <div 
                style={{
                  width: "20vw",
                  height: "50vh",
                  backgroundImage:
                    `url(${item.productImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
                ))}
            </div>
            <div style={{right:"13.3vw"}} className="absolute bottom-8">
            <Searchbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
