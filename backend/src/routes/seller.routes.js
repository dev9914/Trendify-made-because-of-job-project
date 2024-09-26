import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, becomeSeller, getOwnProducts } from "../controllers/seller.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/addproduct").post(verifyJWT, upload.fields([
    {
        name: "productImage",
        maxCount: 3
    }, 
]), addProduct)

router.route("/becomeseller").patch(verifyJWT, becomeSeller)

router.route("/ownproducts").get(verifyJWT,getOwnProducts)

export default router