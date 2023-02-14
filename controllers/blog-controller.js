"use strict";

const { db } = require("../db");
const Post = require("../models/post");
// const firestore = firebase.firestore();

const createPost = async (req, res, next) => {
  try {
    const data = req.body;
    var currentdate = new Date();
    var datetime =
      "Created on: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    data.createdOn = datetime;
    // data.updatedOn = new Date().today() + " @ " + new Date().timeNow();
    await db.collection("posts").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.collection("posts");
    const data = await posts.get();
    const postsArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const post = new Post(
          doc.id,
          doc.data().userId,
          doc.data().title,
          doc.data().slug,
          doc.data().author,
          doc.data().createdOn,
          doc.data().updatedOn,
          doc.data().content,
          doc.data().status
        );
        postsArray.push(post);
      });
      res.send(postsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await db.collection("posts").doc(id);
    const data = await post.get();
    if (!data.exists) {
      res.status(404).send("Post with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await db.collection("posts");
    const data = await posts.get();
    const postsArray = [];
    if (data.empty) {
      res.status(404).send("No record found");
    } else {
      data.forEach((doc) => {
        if (doc.data().userId === userId) {
          const post = new Post(
            doc.id,
            doc.data().userId,
            doc.data().title,
            doc.data().slug,
            doc.data().author,
            doc.data().createdOn,
            doc.data().updatedOn,
            doc.data().content,
            doc.data().status
          );
          postsArray.push(post);
        }
      });
      res.send(postsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    var currentdate = new Date();
    var datetime =
      "Updated on: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    data.updatedOn = datetime;
    const post = await db.collection("posts").doc(id);
    await post.update(data);
    res.send("Record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await db.collection("posts").doc(id);
    if (!post.exists) {
      res.status(404).send("Post with the given ID not found");
    } else {
      post.delete();
      res.send("Record deleted successfuly");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};
