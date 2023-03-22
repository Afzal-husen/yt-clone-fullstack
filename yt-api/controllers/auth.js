import userModel from "../models/userModel.js";
import { customError } from "../errors/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 

export  const signUp = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        // const newUser = new userModel({...req.body, password: hash});
        // await newUser.save();
        const newUser = await userModel.create({...req.body, password: hash});
        res.status(200).json({user: newUser});
        
    } catch (error) {
        next(error);
    }
}



export const signIn = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            next( customError(404, "User not found"));            
        }        

        const isCorrect =  await bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) {
            next(customError(401, "Invalid Credentials"));
        }

        const {password, ...rest} = user._doc

        const token = jwt.sign({
            userID: user._id,
            exp: Math.floor(Date.now()/1000) + (60 * 60),
        }, process.env.SECRET_KEY)

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(rest)
        
    } catch (error) {
        next(error);
    }
}


export const googleSignIn = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await userModel.findOne({email: email});
        if(user) {
            const token = jwt.sign({
                userID: user._id
            }, process.env.SECRET_KEY)

            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(user)
        }
        else {
            const newUser = new userModel({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();

            const token = jwt.sign({
                userID: savedUser._id
            }, process.env.SECRET_KEY)
            
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)
        }
    } catch (error) {
        next(error)
    }
}





