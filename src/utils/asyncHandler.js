
            // PROMISE METHOD .THEN .CATCH

const asynchandler = (RequestHandler) => {
    return (req, res, next) => {
        Promise.resolve(RequestHandler(req, res, next)).
        catch((error) => (next(error)))
    }
}



export default asynchandler


        //    TRY Catch Method  


// const asynchandler = (fn ) => async(req,res,next ) => {


//     try {

//         await fn(req,res,next)

//     }

//     catch (error) {
//         res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }