import express from "express";
const router = express.Router();

import {
  createBlog,
  getBlog,
  particularBlog,
  getBlogByUser,
} from "../controllers/blog.js";

router.post("/", createBlog);
router.get("/", getBlog);
router.get("/:id", particularBlog);
router.get("/userBlog/:id", getBlogByUser);

export default router;
