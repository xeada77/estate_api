import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:postId", verifyToken, getPost);

router.post("/", verifyToken, createPost);

router.put("/:postId", verifyToken, updatePost);

router.delete("/:postId", verifyToken, deletePost);

export default router;
