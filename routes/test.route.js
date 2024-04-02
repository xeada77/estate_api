import express from "express";
import { shouldBeAuth, shouldBeAdmin } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/shouldbeauth", shouldBeAuth);

router.get("/shouldbeadmin", shouldBeAdmin);

export default router;
