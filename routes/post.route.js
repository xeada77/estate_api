import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { verifySaved } from "../middleware/verifySaved.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:postId", verifySaved, getPost);

router.post("/", verifyToken, createPost);

router.put("/:postId", verifyToken, updatePost);

router.delete("/:postId", verifyToken, deletePost);

export default router;
