const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  _id: String,
  email: String,
  password: String,
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);

const wishSchema = new mongoose.Schema({
  
  user: String ({ref:User}),
})

WishList = mongoose.model("WishList", wishSchema);

module.exports = {
  User, 
  wishSchema,
};