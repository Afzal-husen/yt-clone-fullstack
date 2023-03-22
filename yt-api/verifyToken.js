import jwt from "jsonwebtoken";
import { customError } from "./errors/customError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(customError(401, "unauthorized"))

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    const {userID} = decode;
    req.user = {userID}
    next();    
} 
