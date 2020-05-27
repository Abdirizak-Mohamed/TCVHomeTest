const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

router.get("/allComments", async (req, res) => {
  try {
    const comments = await Comment.find({});
    //Check if any comments have been found
    if (!comments.length) {
      return res.status(404).send({ message: "No comments found" });
    }

    //Return all recorded comments
    res.status(200).send({ comments: comments });
  } catch (error) {
    return res.status(500).json({ message: "An error occured!" });
  }
});

router.post("/newComment", async (req, res) => {
  const { name, comment, dateTime } = req.body;
  try {
    //Handle missing parameters
    if (!name || !comment || !dateTime) {
      return res.status(400).json({ message: "Incomplete Request" });
    }

    //Create new comment document
    const addNewComment = new Comment({
      name: name,
      comment: comment,
      dateTime: dateTime
    });

    //Save the comment document to database
    addNewComment.save((err, newComment) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "An error occured saving comment!" });
      } else {
        return res.status(200).send({
          message: "Added comment successfully!",
          newComment: newComment
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occured!" });
  }
});

module.exports = router;
