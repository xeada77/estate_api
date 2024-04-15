import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  savePost,
  getProfilePosts,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search/:userId", verifyToken, getUser);

router.put("/:userId", verifyToken, updateUser);

router.delete("/:userId", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, getProfilePosts);

export default router;
