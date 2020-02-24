const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://nitiksjrs:jrscode@cluster0-jxlsu.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const UserModel = mongoose.model("user", userSchema);
app.post("/user", async (request, response) => {
  try {
    console.log("POST USER");
    var userInstance = new UserModel(request.body);
    //console.log(userInstance);
    const created = await UserModel.create(userInstance);
    response.send(created);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/user", async (request, response) => {
  try {
    console.log("GET USER");
    var userInstance = await UserModel.find({ username: "coolguy" });
    //console.log(userInstance);
    response.send(userInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/user/", async (request, response) => {
  try {
    console.log("PUT USER");
    var userInstance = await UserModel.findOneAndUpdate(
      request.query,
      request.body
    );
    // console.log(userInstance);
    response.send(userInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/user/:username", async (request, response) => {
  try {
    console.log("DELETE USER");
    var userInstance = await UserModel.findOneAndDelete({
      username: request.params.username
    });
    // console.log(userInstance);
    response.send(userInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  try {
    console.log("GET USERS");
    var userInstances = await UserModel.find({});
    var usersMap = {};
    userInstances.map(user => {
      usersMap[user.id] = user;
    });
    // console.log(usersMap);
    response.send(usersMap);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/", async (request, response) => {
  try {
    console.log("SEND HTML HOME PAGE");
    response.sendFile(path.join(__dirname + "/index1.html"));
  } catch (error) {
    response.status(500).send(error);
  }
});

const start = () => {
  return app.listen(PORT, () => console.log(`server is running on ${PORT}`));
};
module.exports = { start };
