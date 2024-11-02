import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }
    try{
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({error:"Unauthorized"})
        }
        const decoded = jwt.verify(token, "22ada22")
        req.user = decoded
        next()
    } catch(e){
        res.status(401).json({error:"Unauthorized"})
    }
}