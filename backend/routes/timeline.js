const express = require('express');
const router = express.Router();
const locks = require('locks');

const checkAuth = require("../middleware/check-auth");

const postModel = require('../models/Post');
const userModel = require('../models/User');
const followModel = require('../models/Followed');

router.get('/getMorePosts', checkAuth, (req, res)  => {
  console.log('getting more post');
  let postsToReturn = [];
  let mutex = locks.createMutex();
  // getting all the user that are followed by current user (specified by username)
  userModel.findOne({username: res.locals.username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        res.status(500).send('query failed');
        console.log('query failed');
        return;
      }
      if (!user) {
        console.log('query returned null');
        res.status(403).send();
        return;
      }

      for (let temp of user.userFollowed) {
        let flusername = temp.followedUserName;
        let followedTags = temp.followedUserTag;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: { tags: { $in: Array.from(followedTags)}},
            options: { sort: { 'createdAt': -1 } }
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}

            for (let tempPost of fluser.userPosts) {
              let postData = {
                postID: tempPost._id,
                createdAt: tempPost.createdAt,
                username: tempPost.username,
                content: tempPost.content,
                tags: tempPost.tags,
                numberOfLikes: tempPost.numberOfLikes,
                quoted: tempPost.quoted,
                comment: tempPost.comment,
                originName: tempPost.originName
              };

              mutex.lock(() => {
                postsToReturn.push(postData);
                mutex.unlock();
              });
            }
          });
      }

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(2000).then(() => {
        //console.log('the return post', postsToReturn);
        res.status(200).send(postsToReturn);
      });

    });

});

router.get('/getHighlight', checkAuth, (req, res)  => {
  console.log('getting highlighted posts');

  let postsToReturn = [];
  let mutex = locks.createMutex();

  // getting all the user that are followed by current user (specified by username)
  userModel.findOne({username: res.locals.username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        res.status(500).send('no such user /or query failed');
        return;
      }
      if (!user) {
        console.log('query returned null');
        return;
      }

      for (let temp of user.userFollowed) {
        let flusername = temp.followedUserName;
        let initialTags = temp.initialTagsWhenFollowed;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: {tags: { $elemMatch: { $nin: Array.from(initialTags)} } },
            options: { sort: { 'createdAt': -1 } }
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}

              for (let tempPost of fluser.userPosts) {
                let postData = {
                  postID:tempPost._id,
                  createdAt: tempPost.createdAt,
                  username: tempPost.username,
                  content: tempPost.content,
                  tags: tempPost.tags,
                  numberOfLikes: tempPost.numberOfLikes,
                  quoted: tempPost.quoted,
                  comment: tempPost.comment,
                  originName: tempPost.originName
                };

                mutex.lock(() => {
                  postsToReturn.push(postData);
                  mutex.unlock();
                });

            } //end for loop
          });
      }

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(2000).then(() => {
        //console.log(postsToReturn);
        res.status(200).send(postsToReturn);
      });

    });

});

router.post('/likePost', checkAuth, (req, res)  => {
  let data = req.body;
  let username = res.locals.username;
  console.log(data);

  try {
    if (data.postID == null || data.postID === '') {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  postModel.findOne( {_id: data.postID}, (err, post) => {
      if (err) {
        console.log(err);
        res.status(500).send('query error');
        return
      }
      if (!post) {
        res.status(403).send('post not found');
        return
      }

      console.log('checking repeated likes');
      let userList = post.likedByUser;
      for (let tempUser of userList) {
        if (tempUser === username) {
          console.log('repeated like by' + username);
          res.status(406).send();
          return;
        }
      }
      userList.push(username);

      let numberOfLikes = post.numberOfLikes;
      numberOfLikes++;
      console.log(post._id + ' number of likes: ' + post.numberOfLikes);
      console.log('now: ', numberOfLikes);

      //updating number of likes, and user list

      postModel.update({_id: data.postID}, { $set: {
            numberOfLikes: numberOfLikes,
            likedByUser: userList
          }
        }, (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('error update number of likes');
            return;
          }

          // updating level of interactions

          followModel.findOne({followedUserName: post.username,
            followerUserName: username}, (err, doc) => {
            if (err) {console.log(err); res.status(500).send();}
            if (!doc) {
              //todo what to do if user follow relation does not exist (follow = false)
              return;
            }
            let interaction = doc.levelOfInteraction;
            interaction++;
            followModel.update({_id: doc._id}, {$set : {levelOfInteraction: interaction}},
              (err) => {
                if (err) {console.log(err); res.status(500).send(); return;}
                res.status(200).send();
              }); //end update follow model

          }); //end find follow model

      }); //end update post model

    }); //end find post model

});

router.post('/quote', checkAuth, (req, res)  => {
  let data = req.body;
  console.log('the data is: ', data);
  try {
    if (data.postID == null || data.postID === '') {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  let newPost = new postModel();
  postModel.findOne( {_id: data.postID}, (err, post) => {
    if (err) {
      console.log(err);
      return
    }
    if (!post) {
      res.status(403).send('post not found');
      return
    }
    newPost.username = res.locals.username;
    newPost.content = post.content;
    newPost.tags = post.tags;
    newPost.quoted = true;
    newPost.comment = data.comment;
    newPost.originName = post.username;

    newPost.save((err, newPost) => {
      if (err) {
        console.log(err);
        res.status(500).send('new quote creation failed');
        return
      }
      let postID = newPost._id;
      userModel.updateOne({username: res.locals.username}, {$push: {userPosts: postID}}, (err) => {
        if (err) {
          console.log(err);
          return
        }
        console.log('quote success');

        // updating level of interactions

        followModel.findOne({followedUserName: newPost.originName,
          followerUserName: res.locals.username}, (err, doc) => {
          if (err) {console.log(err); res.status(500).send();}
          if (!doc) {
            //todo what to do if user follow relation does not exist (follow = false)
            return;
          }
          let interaction = doc.levelOfInteraction;
          interaction++;
          followModel.update({_id: doc._id}, {$set : {levelOfInteraction: interaction}},
            (err) => {
              if (err) {console.log(err); res.status(500).send(); return;}
              res.status(200).send();
            }); //end update follow model

        }); //end find follow model

      }); //end update user posts

    }); //end save new post model

  }); //end find post model

});

router.post('/getUserLine', checkAuth, (req, res) => {
  const username = req.body.username;
  console.log('getting userline', username);
  userModel.findOne({username: username})
    .populate({
      path: 'userPosts',
      options: { sort: { 'createdAt': -1 } }
    })
    .exec((err, user) => {
      if (err) {console.log(err); return res.status(500);}

      let postsToReturn = [];

      for (let tempPost of user.userPosts) {
        let postData = {
          postID: tempPost._id,
          createdAt: tempPost.createdAt,
          username: tempPost.username,
          content: tempPost.content,
          tags: tempPost.tags,
          numberOfLikes: tempPost.numberOfLikes,
          quoted: tempPost.quoted,
          comment: tempPost.comment,
          originName: tempPost.originName
        };
        postsToReturn.push(postData);
      }

      console.log(postsToReturn);
      res.status(200).send(postsToReturn);
    })

});

router.post('/getPostsWithTags', checkAuth, (req, res) => {
  let data = res.data;

  try {
    if (data.tags == null || data.tags === []) {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  console.log('getting posts with specified tags');
  let postsToReturn = [];
  let mutex = locks.createMutex();

  postModel.find({match: { tags: { $in: Array.from(data.tags)}},
                  options: { sort: { 'createdAt': -1 }}}, (err, doc) => {
    if (err) {
      res.status(500).send('query failed');
      console.log('query failed');
      return;
    }
    if (!doc) {
      console.log('query returned null');
      res.status(403).send();
      return;
    }

    for (let tempPost of doc) {
      let postData = {
        postID: doc._id,
        createdAt: doc.createdAt,
        username: doc.username,
        content: doc.content,
        tags: doc.tags,
        numberOfLikes: doc.numberOfLikes,
        quoted: doc.quoted,
        comment: doc.comment,
        originName: doc.originName
      };
      postsToReturn.push(postData);
    }

    res.status(200).send(postsToReturn);
  });

});

router.post('/getRelevancePosts', checkAuth, (req, res) => {
  console.log('getting relevant post');
  let postsToReturn = [];
  let mutex = locks.createMutex();

  // getting all the user that are followed by current user (specified by username)
  userModel.findOne({username: res.locals.username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        res.status(500).send('query failed');
        console.log('query failed');
        return;
      }
      if (!user) {
        console.log('query returned null');
        res.status(403).send();
        return;
      }

      for (let temp of user.userFollowed) {
        let flusername = temp.followedUserName;
        let followedTags = temp.followedUserTag;
        let interaction = temp.levelOfInteraction;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: { tags: { $in: Array.from(followedTags)}},
            options: { sort: { 'createdAt': -1 } }
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}
            if (!fluser) {console.log('empty'); return res.status(403);}

            for (let tempPost of fluser.userPosts) {
              let postData = {
                postID: tempPost._id,
                createdAt: tempPost.createdAt,
                username: tempPost.username,
                content: tempPost.content,
                tags: tempPost.tags,
                numberOfLikes: tempPost.numberOfLikes,
                quoted: tempPost.quoted,
                comment: tempPost.comment,
                originName: tempPost.originName,
                relevance: interaction
              };

              // calculating relevance
              for (let tempTag of tempPost.tags) {
                if (followedTags.includes(tempTag)) {
                  postData.relevance += 10;
                }
              }

              mutex.lock(() => {
                postsToReturn.push(postData);
                mutex.unlock();
              });
            } //end for

          }); //end find user model

      }//end for

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(3000).then(() => {
        //console.log('the return post', postsToReturn);

        // sort by relevance and timestamp
        postsToReturn.sort((a, b) => {
          if (a.relevance < b.relevance) return -1;
          if (a.relevance > b.relevance) return 1;
          // now a.relevance = b.relevance
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });

        res.status(200).send(postsToReturn);
      });

    });

});

router.post('/getPotentialPosts', checkAuth, (req, res) => {
  console.log('getting potential posts');
  let postsToReturn = [];
  let mutex = locks.createMutex();

  // getting all the user that are followed by current user (specified by username)
  userModel.findOne({username: res.locals.username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        res.status(500).send('query failed');
        console.log('query failed');
        return;
      }
      if (!user) {
        console.log('query returned null');
        res.status(403).send();
        return;
      }

      let followedUsers = [];
      let allFollowedTags = [];
      for (let tempFollow of user.userFollowed) {
        followedUsers.push(tempFollow.followedUserName);
        for (let tempTag of tempFollow.followedUserTag) {
          allFollowedTags.push(tempTag);
        }
      }

      postModel.find({username: {$nin: Array.from(followedUsers)},
                      $match: { tags: { $in: Array.from(allFollowedTags)}}
                      }, (err, doc) => {
        if (err) {console.log(err); return res.status(500);}
        if (!doc) {console.log('empty'); return res.status(403);}

        for (let tempPost of doc) {
          let postData = {
            postID: tempPost._id,
            createdAt: tempPost.createdAt,
            username: tempPost.username,
            content: tempPost.content,
            tags: tempPost.tags,
            numberOfLikes: tempPost.numberOfLikes,
            quoted: tempPost.quoted,
            comment: tempPost.comment,
            originName: tempPost.originName,
            potential: 0
          };

          // calculating potential
          for (let tempTag of tempPost.tags) {
            if (allFollowedTags.includes(tempTag)) {
              postData.potential++;
            }
          }

          mutex.lock(() => {
            postsToReturn.push(postData);
            mutex.unlock();
          });
        } //end for

      }); // find all posts

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(3000).then(() => {
        //console.log('the return post', postsToReturn);

        // sort by relevance and timestamp
        postsToReturn.sort((a, b) => {
          if (a.potential < b.potential) return -1;
          if (a.potential > b.potential) return 1;
          // now a.relevance = b.relevance
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });

        res.status(200).send(postsToReturn);
      });

    });
});

module.exports = router;
