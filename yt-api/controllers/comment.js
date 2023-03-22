import videoModel from "../models/videoModel.js";
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import { customError } from "../errors/customError.js";
import { request } from "express";

export const newComment = async (req, res, next) => {
        try {
           const newComment = commentModel({...req.body, userID: req.user.userID})
            await newComment.save();
            res.status(200).json(newComment)
        } catch (error) {
        next(error);
        }   
}

export const deleteComment = async (req, res,next) => {
    const {id} = req.params;
    try {
        const comment = await commentModel.findById(id)
        const video = await videoModel.findById(id)
        if(req.user.userID === comment.userID || req.user.userID === video.userID) {
            const deletedComment = await commentModel.findByIdAndDelete(id,{new: true})
            res.status(200).json(deletedComment)
        }
        else {
            next(customError(403, "You are not allowed to delete this comment"))
        }
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req, res, next) => {
    const {videoID} = req.params
    try {
        const comments = await commentModel.find({videoID: videoID})
        res.status(200).json(comments)
    } catch (error) {
        next(error);
    }
}