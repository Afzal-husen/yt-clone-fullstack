import express from 'express';
import { updateUser, deleteUser, getUser, subscribe, unSubscribe, liked, disLiked } from "../controllers/user.js";
import { verifyToken } from '../verifyToken.js';
const router = express.Router();


// UPDATE USER
router.put("/:id",  verifyToken, updateUser)

// DELETE USER
router.delete("/:id", verifyToken, deleteUser)

// GET A USER
router.get("/find/:id",  getUser)

// SUBSCRIBE TO A USER
router.put("/sub/:channelId", verifyToken, subscribe)

// UNSUBSCRIBE FROM A USER
router.put("/unsub/:channelId", verifyToken, unSubscribe)

// like
router.put("/like/:videoId", verifyToken, liked)

// dislike
router.put("/dislike/:videoId", verifyToken, disLiked)



export default router;