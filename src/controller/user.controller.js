import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { uploadCloundinaryFile } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";


const registeruser = asyncHandler(async (req,res)=>{
   //steps to register a user
   //get user details form frontend
   //validation-not empty
   //check if user is already exists:username,email
   //check for images,check for avatar
   //upload them to cloudinary,avatar
   //create user object -create data in db
   //remove password and refreshtoken form response
   //check for user creation
   //return res

   const{fullname,password,email,username} = req.body

    if([fullname,password,email,username].some((fields)=> fields?.trim() ==="")){
      throw new ApiError(400,"All fields are required");
    }

    if(!email.includes("@")){
      throw new ApiError(400,"email is not valid")
    }
   
  const existedUser =  User.findOne({
      $or: [{username},{email}]
    })

   
    if(existedUser == true){
      throw new ApiError(409,"user is already existed");
    }


  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if(!avatarLocalpath){
    throw new ApiError(407,"avatar image is required")
  }

    const avatar = await uploadCloundinaryFile(avatarLocalpath);
    const coverImage = await uploadCloundinaryFile(coverImageLocalpath);

    if(!avatar1){
      throw new ApiError(407,"avatar image is required")
    }

  const user = await  User.create({
      fullname,
      email,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      password,
      username:username.toLowerCase()
    })

  const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
  )
  
  if(!createdUser){
    throw new ApiError(500,"something went wrong while creating the user")
  }



  return  res.status(201).json(
           new apiResponse(200,createdUser,"user registered succesfully")
  )

})

export { registeruser, }