const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }

}

// this is another method to do this
// const asyncHandler = (func) => async (req,res,next) =>
// {
//     try {
        
//     } catch (error) {
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }

// }


export {asyncHandler}