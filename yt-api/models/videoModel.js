import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    thumbUrl : {
        type: String,
        required: true
    },
    vidUrl : {
        type : String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    tags : {
        type: [String],
        default: []
    },
    Liked: {
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    disLiked : {
        type: [String],
        default: []
    },
    commented: {
        type: [String],
        default: []
    }

}, {timestamps: true})


export default mongoose.model("Video", videoSchema)
