import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", verifyToken, getUsers);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

export default router;
