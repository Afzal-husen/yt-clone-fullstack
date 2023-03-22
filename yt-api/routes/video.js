import express from "express";
const router = express.Router();
import { addVideo,
        updateVideo,
        deleteVideo,
        getVideo,
        addView,
        getSubVideos,
        trendVideo,
        randomVideo, 
        getByTags,
        getBySearch,
        } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

router.post("/", verifyToken, addVideo)
router.put("/:videoId", verifyToken, updateVideo)
router.delete("/:videoId", verifyToken, deleteVideo)
router.get("/find/:videoId", getVideo)
router.put("/views/:videoId", addView)
router.get("/sub", verifyToken,  getSubVideos)
router.get("/trending", trendVideo)
router.get("/random", randomVideo)
router.get("/tags", getByTags)
router.get("/search", getBySearch)






export default router;