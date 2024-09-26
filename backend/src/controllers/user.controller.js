import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password,fullname } = req.body;

  if (username === "") {
    throw new ApiError(400, "username is required");
  }
  if (fullname === "") {
    throw new ApiError(400, "username is required");
  }
  if (email === "") {
    throw new ApiError(400, "email is required");
  } else if (!email.endsWith("@gmail.com")) {
    throw new ApiError(400, "email must be a Gmail address");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    fullname
  });

  const createdUser = await User.findById(user._id).select("-password -__v");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if(user.role == 'seller') {
    throw new ApiError(401,"Only buyer can login from this page")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is not Correct");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
)


});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
   httpOnly: true,
   secure: true,
 };

 return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged Out Successfully"))



});

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const userDetails = await User.findById(userId) 

  if(!userDetails) {
    throw new ApiError(500, "Somthing went wrong while finding user Details")
  }

  res.status(200).json(new ApiResponse(200,{userDetails},"User found Successfully"))
})

const sellerLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if(user.role === "buyer") {
    throw new ApiError(400, "Only sellers are permitted to log in from this page")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is not Correct");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInSeller = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200, 
        {
            user: loggedInSeller, accessToken, refreshToken
        },
        "Seller logged In Successfully"
    )
)


});

const getProducts = asyncHandler(async (req, res) => {

  const { category} = req.body

  const products = await Product.find({ category : category});

  res.status(200).json(new ApiResponse(200, {products},))
})

const getProductbyId = asyncHandler(async (req, res) => {
  const {productId} = req.body

  const getProduct = await Product.findById(productId)

  res.status(200).json(new ApiResponse(200,{getProduct},"Product Found Successfully"))
})

const recentlyView = asyncHandler( async (req, res) => {
      const userId = req.user._id; 
      const productId = req.params.id;

      const user = await User.findById(userId);

      if (!user.recentlyViewed.includes(productId)) {
         user.recentlyViewed.unshift(productId); 
      }

      if (user.recentlyViewed.length > 10) {
         user.recentlyViewed.pop();
      }

      await user.save();

      return res.status(200).json(new ApiResponse(200, {}, "Success: True"))
})

const getrecentViewed = asyncHandler( async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate('recentlyViewed');

  return res.status(200).json(new ApiResponse(200, { recentlyViewed: user.recentlyViewed}))
})

export { registerUser, loginUser, logoutUser , sellerLogin, getUserDetails, getProducts,getProductbyId,recentlyView,getrecentViewed};
