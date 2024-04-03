import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();
console.log(process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", verifyToken, testRoute);
app.use("/api/user", userRoute);

app.listen(8800, () => {
  console.log("Server is running!");
});
