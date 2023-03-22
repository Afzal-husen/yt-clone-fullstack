import express from "express";
import { verifyToken } from "../verifyToken.js";
import { newComment, deleteComment, getComments } from "../controllers/comment.js";
const router = express.Router();

router.post("/", verifyToken, newComment)
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoID", getComments);





export default router;