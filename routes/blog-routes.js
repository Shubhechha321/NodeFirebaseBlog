const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUserId,
} = require("../controllers/blog-controller");

const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:userId", getPostsByUserId);
router.get("/post/:id", getPostById);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = {
  routes: router,
};
