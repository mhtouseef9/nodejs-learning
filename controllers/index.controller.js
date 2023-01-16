const User = require("../models/user");
exports.index = (req, res) => {
  res.send({ title: 'finally hit first route within controller!!!!6' });

  // Tutorial.find(condition)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //             err.message || "Some error occurred while retrieving tutorials."
  //       });
  //     });
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
            if (data.join() != []) {
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
                                err.message || "Some error occurred while creating the Tutorial."
                        });
                    });
            }
            }
         )

  // res.send({ title: 'finally hit first post route within controller!!!!' });

  // Tutorial.find(condition)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //             err.message || "Some error occurred while retrieving tutorials."
  //       });
  //     });
};