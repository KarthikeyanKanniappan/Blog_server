import BlogModal from "../models/blog.js";

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new BlogModal({
    ...blog,
    createdAt: new Date().toISOString(),
  });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModal.find();
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const particularBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};
