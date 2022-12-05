import BlogModal from "../models/blog.js";

export const createBlog = async (req, res) => {
  const blog = req.body;
  console.log(blog);
  const newBlog = new BlogModal({
    ...blog,
    // createdAt: new Date().toIsoString(),
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
