import express from "express";
const router = express.Router();

import { createBlog, getBlog } from "../controllers/blog.js";

router.post("/", createBlog);
router.get("/", getBlog);
export default router;
