import { Router } from "express";
import { loginUser, registerUser, logoutUser, sellerLogin, getUserDetails, getProducts, getProductbyId, recentlyView, getrecentViewed } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/sellerlogin").post(sellerLogin)


//secured routes
router.route('/getproductbyid').post(verifyJWT,getProductbyId)
router.route("/products/:id/view").post(verifyJWT,recentlyView)
router.route("/product/getrecentviewed").get(verifyJWT,getrecentViewed)
router.route("/logout").post(verifyJWT, logoutUser)
router.route('/getuserdetails').get(verifyJWT, getUserDetails)
router.route('/getproducts').post(verifyJWT, getProducts)

export default router