import ApiError from "../errors/apiError.js";


export const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError) {
        return res.status(err.status || 500).json({message: err.message || "unknown error"});
    }
    return res.status(500).json({message: "unknown error"});

}