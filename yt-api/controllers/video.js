import videoModel from "../models/videoModel.js"
import userModel from "../models/userModel.js";
import { customError } from "../errors/customError.js"
import { request } from "express";

export const addVideo = async (req, res, next) => {
  const newVideo = await videoModel({userID: req.user.userID, ...req.body})
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
}


export const updateVideo = async (req, res, next) => {
  const {videoId} = req.params;
  const video = await videoModel.findById(videoId);
  if(!video) return next(customError(404, "Video not found"))

     try {
      if(req.user.userID === video.userID) {
        const updatedVideo = await videoModel.findByIdAndUpdate(videoId, {
          $set: req.body
        }, {new: true})
  
        res.status(200).json({updatedVideo})
      }
      else {
        next(customError(403, "you can only update your own video"))
      }
     } catch (error) {
      next(error)
     }
}


export const deleteVideo = async (req, res, next) => {
  
  const {videoId} = req.params;
  const video  = await videoModel.findById(videoId);
  if(!video) return next(customError(404, "Video not found"))

  try {
    if(req.user.userID === video.userID) {
      const deletedVideo = await videoModel.findByIdAndDelete(videoId);
      res.status(200).json({deletedVideo}) 
    }
    else {
      next(customError(403, "you can only delete your own video"))
    }
  } catch (error) {
   next(error) 
  } 
}


export const getVideo = async (req, res, next) => {
  try {
    const {videoId} = req.params;
    const video = await videoModel.findById(videoId);
    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}


export const addView = async (req, res, next) => {
  try {
    const {videoId} = req.params;
    const view = await videoModel.findByIdAndUpdate(videoId, {
      $inc: {views: 1}
    }, {new: true})
    res.status(200).json({views: view.views})
  } catch (error) {
    next(customError(404, "video not found"))
  }
}


export const getSubVideos = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userID)
    console.log(user)
    const subscribed = user.subscribedChannels
    const list = await Promise.all(subscribed.map(async (channelId) => {
      return await videoModel.find({userID: channelId})
    }))

    const listOfSubVid = list.flat().sort((a, b) => b.createdAt - a.createdAt)
    res.status(200).json(listOfSubVid)

  } catch (error) {
    next(customError(404, "not subscribed videos found"))
  }
}


export const trendVideo = async (req, res, next) => {
  try {
    const videos =  await videoModel.find({}).sort({views: -1})     // -1 means descending order, 1 means ascending order
    res.status(200).json(videos)
  } catch (error) {
    next(error)   
  } 
}


export const randomVideo = async (req, res, next) => {
  try {
    const videos = await videoModel.aggregate([ {$sample: {size: 40}} ])
    res.status(200).json(videos)
  } catch (error) {
    next(error)   
  }
}


export const getByTags = async(req, res, next) => {
 try {
  const tags = req.query.tags.split(",")
  const videos = await videoModel.find({tags: {$in: tags}}).limit(40)
  res.status(200).json(videos)
 } catch (error) {
  next(error)
 } 
}


export const getBySearch = async (req, res, next) => {
  try {
    const searchQuery = req.query.q
    const videos = await videoModel.find({title: {$regex: searchQuery, $options: "i"}}).limit(20)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

