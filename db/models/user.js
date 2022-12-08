// models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  refreshToken: String,
  scope: String,
  idToken: String,
  accessToken: String,
});

let User;
// const User = mongoose.model("users", UserSchema);
// module.exports = mongoose.model("busers", UserSchema);
// let User;
if (mongoose.models.users) {
  User = mongoose.model("users");
} else {
  User = mongoose.model("users", UserSchema);
}

module.exports = User;
// module.exports = mongoose.model("users") || mongoose.model("users", UserSchema);
