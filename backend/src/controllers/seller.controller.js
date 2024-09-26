import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const becomeSeller = asyncHandler( async (req, res) => {

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          role: 'seller',
        },
      },
      {
        new: true,
      }
    );
  
    if(!user) {
      throw new ApiError(500, "user not found")
    }
  
    res.status(201).json( new ApiResponse(200, {user: user},"You are now a seller"));
  
  })

const addProduct = asyncHandler( async (req, res) => {

    if (req.user.role !== 'seller') {
        throw new ApiError(400, "Access denied. Only sellers can add products.")
  }

  const { name, price, description ,category} = req.body

  if (!name) {
    throw new ApiError(400, 'Name is required.')
  }
  if (!price) {
    throw new ApiError(400, 'Price is required.')
  }
  if (!category) {
    throw new ApiError(400, 'Category is required.')
  }

  const ProdcutImageLocalPath = req.files?.productImage[0]?.path

  if (!ProdcutImageLocalPath) {
    throw new ApiError(400, "Product Image file is required")
   }

  const productImagecloud = await uploadOnCloudinary(ProdcutImageLocalPath)

   if (!productImagecloud) {
    throw new ApiError(400, "Some error occured while uploading the product image")
   }

    const product = await Product.create({
      name,
      price,
      productImage: productImagecloud?.url,
      description,
      seller: req.user._id,
      category
    })

    const createProduct = await Product.findById(product._id)

    if(!createProduct) {
        throw new ApiError (500, "Something went wrong while creating the product")
    }

    res.status(200).json(new ApiResponse(200, {createProduct},"Product created Successfully"))


})

const getOwnProducts = asyncHandler( async (req, res)=> {
  if (req.user.role !== 'seller') {
    throw new ApiError(400, "Access denied. Only sellers can access this route.")
  }

  // const sellerId = req.user._id

  const ownProduct = await Product.find({seller: req.user._id });

  res.status(200).json( new ApiResponse(200, {ownProduct}, "All product uploaded by you"))
})

export {becomeSeller, addProduct, getOwnProducts}




// const express = require('express');
// const Product = require('../models/Product');
// const verifyToken = require('../middleware/auth');
// const router = express.Router();

// // Create a new product (only for sellers)
// router.post('/create', verifyToken, async (req, res) => {
//   if (req.user.role !== 'seller') {
//     return res.status(403).json({ message: "Access denied. Only sellers can add products." });
//   }

//   const { name, price, description } = req.body;
//   try {
//     const newProduct = new Product({
//       name,
//       price,
//       description,
//       seller: req.user.userId
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().populate('seller', 'username');
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;