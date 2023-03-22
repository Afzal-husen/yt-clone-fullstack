import express from "express";
import {signUp, signIn, googleSignIn}  from "../controllers/auth.js";

const router = express.Router();


router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(googleSignIn);



export default router;