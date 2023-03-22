import { customError } from "../errors/customError.js";
import userModel from "../models/userModel.js";
import videoModel from "../models/videoModel.js";

export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user) {
        try {
            const {id} = req.params 
            const updatedUser =  await userModel.findByIdAndUpdate(id, {
                $set: req.body
            }, {new: true})
    
            res.status(200).json({updatedUser})
        } catch (error) {
            next(error)
        }    
    }
    else {
        next(customError(403, "you can only update your own profile, FORBIDDEN!!"))        
    }
}


export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.userID) {
        try {
            const {id} = req.params 
            const user = await userModel.findByIdAndDelete(id);
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    } 
    else {
        next(customError(403, "you can only delete your own profile, FORBIDDEN!!"))        
    }
}


export const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}


export const subscribe = async (req, res, next) => {
    // if(req.params.channelId === req.user.userID) {
    //     try {
    //         const {channelId} = req.params
    //         await userModel.findByIdAndUpdate(channelId, {
    //             $push: { subscribedChannels: req.user.userID }
    //         })
    //         await userModel.findByIdAndUpdate(req.user.userID, {
    //             $inc: { subscriberCount: 1 }
    //         })
    //         res.status(200).json({msg: "subscription successful"})
    //     } catch (error) {
            
    //     }
    // }
    // else {
    //     next(customError(404, "channel not found"))
    // }
    try {
        const {channelId} = req.params;
        const {userID} = req.user
        await userModel.findByIdAndUpdate(userID, {
            $push: {subscribedChannels: channelId},
        })
        await userModel.findByIdAndUpdate(channelId, {
            $inc: {subscriberCount: 1}
        })
        res.status(200).json({msg: "Subscription Successfull"})
    } catch (error) {
        next(error)
    }
}

export const unSubscribe = async (req, res, next) => {
    // if(req.params.channelId === req.user.userID) {
    //     try {
    //         const {channelId} = req.params
    //         await userModel.findByIdAndUpdate(channelId, {
    //             $pull: { subscribedChannels: req.user.userID }
    //         })
    //         await userModel.findByIdAndUpdate(req.user.userID, {
    //             $inc: { subscriberCount: -1 }
    //         })
    //         res.status(200).json({msg: "unsubscription successful"})
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // else {
    //     next(customError(404, "channel not found"))
    // }
    try {
        const {channelId} = req.params;
        const {userID} = req.user
        await userModel.findByIdAndUpdate(userID, {
            $pull: {subscribedChannels: channelId},
        })
        await userModel.findByIdAndUpdate(channelId, {
            $inc: {subscriberCount: -1}
        })
        res.status(200).json({msg: "UnSubscription Successfull"})
    } catch (error) {
        next(error)
    }
}


export const liked = async (req,res,next) => {
    const {videoId} = req.params;
    try {
        const like = await videoModel.findByIdAndUpdate(videoId, {
          $addToSet: {Liked: req.user.userID},
          $inc: {likeCount: 1},
          $pull: {disLiked: req.user.userID},
        }, {new: true})
        res.status(200).json(like)
      
    } catch (error) {
      next(error)
    }
  }


export const disLiked = async (req,res,next) => {
    const {videoId} = req.params;
    try { 
        const dislike = await videoModel.findByIdAndUpdate(videoId, {
            $pull: {Liked: req.user.userID},
            $inc: {likeCount: -1},
            $addToSet: {disLiked: req.user.userID}
        }, {new: true})
        res.status(200).json({dislike})
    } catch (error) {
        next(error)        
    }
} 
