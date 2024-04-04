import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", verifyToken, getUser);

router.put("/:userId", verifyToken, updateUser);

router.delete("/:userId", verifyToken, deleteUser);

export default router;
