import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullname: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    refreshToken: {
      type: String
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      default:'buyer'
    },
    recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", UserSchema);
