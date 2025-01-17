import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'



//verify jwt
export const  verifyJWT=asyncHandler(async(req,res,next)=>{


 
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
   if (!token) {
        new ApiError(401,"unauthorized request")
   }



  

   const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

   const user=await User.findById(decodedToken?._id).select("-password -refreshToken")





   if (!user) {
    new ApiError(401,"Invalid AccessToken")
   }

   req.user=user
   next()
 
})

