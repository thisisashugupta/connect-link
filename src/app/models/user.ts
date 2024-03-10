import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI || "");
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    user: String,
    email: String,
    name: String,
    image: String,
    saved: Boolean,
    active: Boolean,
    interests: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;