import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: [{ type: String }],
  github: { type: String, required: true },
  codingProfiles: {
    leetcode: { type: String },
    hackerrank: { type: String },
    codechef: { type: String },
  },
  projects: [
    {
      title: { type: String, required: true },
      status: { type: String, default: "Completed" },
      description: { type: String },
    },
  ],
  resumeUrl: { type: String, default: "https://github.com/pavansai-01" }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;