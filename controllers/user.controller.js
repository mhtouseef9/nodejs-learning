const User = require("../models/user");
const axios = require("axios");
const {static} = require("express");
// var posts;
exports.index = (req, res) => {
    const User = require("../models/user.js");
    // var users = User.find()
    // console.log(users)
    // res.status(200).send(users);
    User.find()
        .then(data => {
          console.log(data)
          res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving users."
        });
      });
};

// create.
exports.create = (req, res) => {
  console.log("in post req")
  const User = require("../models/user.js");
  // const User = db.users;
  // console.log(db)
  // console.log(db.users)
  console.log(req.body)
  // Save Tutorial in the database
  User.find({email: req.body.email})
      .then(data => {
            console.log(data)
          // if data == []
            if (Array.isArray(data) && data.length) {
                res.send({message: "user already exists with this email " + req.body.email});
            }
            else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    isConfirmed: req.body.isConfirmed ? req.body.isConfirmed : false
                });
              user
                  .save(user)
                  .then(data => {
                    res.send(data);
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                          err.message || "Some error occurred while creating the user."
                    });
                  });
            }
          }
      )
}

// update
exports.update = (req, res) => {
  console.log("in put req")
  const User = require("../models/user.js");
  User.findByIdAndUpdate(req.params.id, req.body)
      .then(data => {
            console.log(data)
            if (!data) {
                res.send({message: "user can not be updated having id " + req.params.id});
            }
            else {
                res.send({message: "user updated successfully with id " + req.params.id});
            }
          }
      )
}

// delete by name
exports.deleteByName = (req, res) => {
  console.log("in delete req")
  const User = require("../models/user.js");
  User.deleteMany({name: req.params.name})
      .then(data => {
            console.log(data)
            if (!data) {
                res.send({message: "Can not be deleted users having name " + req.params.name});
            }
            else {
                res.send({message: "Users deleted successfully with name " + req.params.name});
            }
          }
      )
}

// get.
exports.getByEmail = (req, res) => {
  console.log("in getByEmail req")
  const User = require("../models/user.js");
  // Save Tutorial in the database
  User.find({email: req.params.email})
      .then(data => {
            if (Array.isArray(data) && data.length) {
              res.send(data);
            }
            else {
                res.send({message: "User does not exist with this email " + req.params.email});
            }
          }
      )
};

// getPostIds Sync
exports.getPostIdsSync = (req, res) => {
  console.log("in getPostIds req Sync");
  const https = require('https');
  let data = '';
  https.get('https://jsonplaceholder.typicode.com/posts', (resp) => {

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
          data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
          const parsedData = JSON.parse(data)
          const postIds = parsedData.map(post => post.id);
          res.send({postIds: postIds, totalPosts: postIds.length});
      });

  }).on("error", (err) => {
      console.log("in error");
      console.log("Error: " + err.message);
  });
};

// getPostById Sync
exports.getPostByIdSync = (req, res) => {
  console.log("in getPostById req sync");
  const https = require('https');
  let data = '';
  https.get('https://jsonplaceholder.typicode.com/posts', (resp) => {

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
          data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
          const parsed_data = JSON.parse(data)
          const filtered_record = parsed_data.find(post => post.id == req.params.id);
          // const filtered_record = parsed_data.filter(post => post.id == req.params.id);
          res.send(filtered_record);
      });

  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
};

// getPostIds Async
exports.getPostIdsAsync = (req, res) => {
    console.log("in getPostIds Async req");
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((resp) => {
            const postIds = resp.data.map(post => post.id);
            res.send({postIds: postIds, totalPosts: postIds.length});
        });
};

// getPostById Async request

// exports.getPostByIdAsync = async (req, res) => {
//   console.log("in getPostById req Async");
//   // check global variable have posts data loaded or not if yes then simply filter otherwise call http request and then filter
//   //  ideally for first time API wil be called and then data should be there in variable.
//     posts = posts? posts : await fetchPosts();
//     let filtered_record = posts.find(post => post.id == req.params.id);
//     res.send(filtered_record);
// };





// getPostById Async through class constructor and static variable

exports.getPostByIdAsync = async (req, res) => {
  console.log("in getPostById req Async");
    // post = new Post()   // used static variable and function, so object not initialized
    let filteredRecord = Post.filterPosts(await Post.posts, req.params.id)
    res.send(filteredRecord);
};

class Post{
    static posts;
    // await can not be used in static, that's we can not use static for initialize posts value.
    // static { this.posts = fetchPosts(); }
    constructor() {
        console.log("in costruc.")
        // await can not be used in constructor, that's we can not use initialize posts value here.
    }
    // this method declared as static because we do not need to make object to call this method.
    static filterPosts(posts, id) {
        return posts.find(post => post.id == id);
    }
}

// this value initializes at class compilation level.
Post.posts = fetchPosts();

async function fetchPosts() {
    const webPosts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return webPosts.data
}

// function using then instead of await but not assigning value to global variable
// function fetchPosts() {
//     var posts;
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//         .then((resp) => {
//             console.log("resp.data");
//             posts = resp.data;
//             console.log(posts.length);
//             // return posts;
//         })
//         .then(() => console.log("posts length in 2nd then: " + posts.length))
//     console.log("resp.data at end");
//     console.log(posts);
// }