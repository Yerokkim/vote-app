const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/User");
const Issue = require("./model/Issue");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) return console.log(err);

  console.log(`connected with ${port}`);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect("mongodb://admin:admin123@ds123963.mlab.com:23963/vue-vote", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    pw: bcrypt.hashSync(req.body.pw, 10),
    pwRepeat: bcrypt.hashSync(req.body.pwRepeat, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "user email is already exist",
      });
    }
    return res.status(200).json({
      message: "sign up done!",
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err)
        return res.status(500).json({
          title: "error",
          error: err,
        });
      if (!user) {
        return res.status(401).json({
          title: "user not exist",
          error: "can not find user",
        });
      }
      //pw wrong
      if (!bcrypt.compareSync(req.body.pw, user.pw)) {
        return res.status(401).json({
          title: "pw is wrong",
          error: "password is not correct",
        });
      }
      //login success
      let token = jwt.sign({ userId: user._id }, "secretkey");
      console.log(token, "here is the token");
      return res.status(200).json({
        title: "login success",
        token: token,
      });
    }
  );
});

//post issue
app.post("/makeissue", (req, res) => {
  const newIssue = new Issue({
    issue: req.body.issue,
    email: req.body.email,
    options: req.body.options,
    friends: req.body.friends,
    keys: req.body.keys,
  });
  newIssue.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    return res.status(200).json({
      message: "success!",
    });
  });
});

//get user
app.get("/user", (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "",
        error: err,
      });
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err, "nuvalid");
      res.status(200).json({
        title: "userinfo",
        user: {
          email: user.email,
        },
      });
    });
  });
});
app.get("/", (req, res) => {
  res.send("hello");
});
