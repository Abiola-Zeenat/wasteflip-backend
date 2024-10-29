const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamp: true,
  }
);

// hash password before saving
UserSchema.pre("save", async function (next){
  if (!this. isModified("password")) return next();
  try 
  {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch(error){
    next(error);
  } 
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword){
  const passwordMatch = await bcrypt.compare(candidatePassword, this.password);
  return passwordMatch;
 
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
