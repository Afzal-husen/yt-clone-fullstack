import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connectDB/connectDB.js";
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import videoRouter from "./routes/video.js"
import commentRouter from "./routes/comment.js"
import errorHandler from "./middleware/error-handler.js";
import cookieParser from "cookie-parser"
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use(errorHandler);





const port  = process.env.PORT | 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("connected to DB")
        app.listen(port, console.log(`server is running on port ${port}...`))
    } catch (error) {
        throw error;
    }
}

start()





