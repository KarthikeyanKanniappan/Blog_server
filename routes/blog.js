import express from "express";
const router = express.Router();

import { createBlog, getBlog, particularBlog } from "../controllers/blog.js";

router.post("/", createBlog);
router.get("/", getBlog);
router.get("/:id", particularBlog);

export default router;
