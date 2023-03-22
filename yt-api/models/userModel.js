import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    image: {
        type: String,
    },
    subscriberCount: {
        type: Number,
        default: 0
    },
    subscribedChannels: {
        type: [String]
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


export default mongoose.model("User", userSchema)