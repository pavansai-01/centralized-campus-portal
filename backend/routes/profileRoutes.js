
import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Seed initial profile data (Run once via Postman to store in MongoDB)
router.post("/seed", async (req, res) => {
  try {
    await Profile.deleteMany();
    const pavanProfile = new Profile({
      name: "CH. Pavan Sai",
      title: "Computer Science Undergraduate",
      email: "pavansaivignesh22@gmail.com",
      phone: "8522861303",
      skills: [
        "C",
        "JavaScript",
        "HTML",
        "CSS",
        "Python",
        "DSA using Python",
        "DSA using C"
      ],
      github: "https://github.com/pavansai-01",
      codingProfiles: {
        leetcode: "https://leetcode.com/u/pavansaivignesh",
        hackerrank: "https://hackerrank.com/pavansaivignesh1",
        codechef: "https://www.codechef.com/users/grand_heart_32"
      },
      projects: [
        {
          title: "Student Service Portal",
          status: "Completed",
          description: "A centralized portal providing academic and administrative services for students."
        },
        {
          title: "SpatialPad-AI",
          status: "In Progress / Current",
          description: "An AI-powered workspace and spatial intelligence application."
        }
      ],
      resumeUrl: "https://github.com/pavansai-01"
    });

    const saved = await pavanProfile.save();
    res.status(201).json({ message: "Profile seeded successfully into MongoDB!", data: saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET profile endpoint
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "No profile found. Please run POST /api/profile/seed first." });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;