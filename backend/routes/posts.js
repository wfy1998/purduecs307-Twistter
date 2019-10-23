const express = require('express');
const router = express.Router();

const PostModel = require('../models/post');

//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  const author = req.query.author;

  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
});

router.post('/create', function (req, res, next) {
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

  try {
    if (!title.length) {
      throw new Error('')
    }
    if (!content.length) {
      throw new Error('')
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back')
  }

  let post = {
    author: author,
    title: title,
    content: content
  };

  PostModel.create(post)
    .then(function (result) {
      post = result.ops[0];
      req.flash('success', '');
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
});


router.get('/create', function (req, res, next) {
  res.render('create')
});


router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId;

  Promise.all([
    PostModel.getPostById(postId),
    CommentModel.getComments(postId),
    PostModel.incPv(postId)// pv + 1
  ])
    .then(function (result) {
      const post = result[0];
      const comments = result[1];
      if (!post) {
        throw new Error('')
      }

      res.render('post', {
        post: post,
        comments: comments
      })
    })
    .catch(next)
});

router.get('/:postId/edit', function (req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
});

router.post('/:postId/edit', function (req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

  try {
    if (!title.length) {
      throw new Error('')
    }
    if (!content.length) {
      throw new Error('')
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back')
  }

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('')
      }

      PostModel.updatePostById(postId, { title: title, content: content })
        .then(function () {
          req.flash('success', '');
          res.redirect(`/posts/${postId}`)
        })
        .catch(next)
    })
});

router.get('/:postId/remove', function (req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('')
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '');
          res.redirect('/posts')
        })
        .catch(next)
    })
});

module.exports = router;
