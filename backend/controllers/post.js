const Post = require("../models/Post");
const fs = require("fs");
const { post } = require("../app");

exports.createPost = (req, res, next) => {
  const postText = req.body.postText;
  const userId = req.body.userId;
  let image = null;
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const post = new Post({
    userId: userId,
    postText: postText,
    imageUrl: image,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Enregistrement d'une nouvelle post" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  const postText = req.body.postText;
  const userId = req.body.userId;
  let image = req.body.imageUrl;
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const postObject = req.file
    ? {
        userId: userId,
        postText: postText,
        imageUrl: image,
      }
    : {
        userId: userId,
        postText: postText,
        imageUrl: image,
      };

  Post.findOne({ _id: req.params.id })
    .then(() => {
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() =>
          res
            .status(200)
            .json({ message: "Modification de post prise en compte" })
        )
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.imageUrl != null) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Suppression de post effectué" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Suppression de post effectué" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => req.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getAllPost = (req, res, next) => {
  Post.find()
    .sort({ _id: -1 })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likePost = (req, res, next) => {
  const like = req.body.like;
  const whoLike = req.body.userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (like == 1) {
        post.likes += 1;
        post.usersLiked.push(whoLike);
      }

      if (like == 0) {
        const likesIndex = post.usersLiked.findIndex(
          (userId) => whoLike == userId
        );
        if (likesIndex >= 0) {
          post.usersLiked.splice(likesIndex, 1);
          post.likes -= 1;
        }
      }
      post.save();
      res
        .status(200)
        .json({ message: "Like pour post mis à jour", post: post });
    })
    .catch((error) => res.status(400).json({ error }));
};
