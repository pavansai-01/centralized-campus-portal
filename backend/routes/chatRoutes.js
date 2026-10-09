import express from "express";
import Groq from "groq-sdk";
import Profile from "../models/Profile.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required in request body" });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // 1. Fetch profile context from MongoDB
    const profile = await Profile.findOne();
    const profileContext = profile
      ? JSON.stringify(profile)
      : "Name: CH. Pavan Sai, Skills: C, JS, Python, DSA, Projects: Student Service Portal, SpatialPad-AI";

    // 2. Call Groq
    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `You are Shadow Monarch AI, the personal portfolio assistant for CH. Pavan Sai.
Answer recruiter and visitor questions accurately based on his profile:
${profileContext}

Instructions:
- Provide direct URLs for his GitHub, LeetCode, HackerRank, and CodeChef when requested.
- Highlight his skills in C, Python, JavaScript, and DSA.
- Keep answers professional, concise, and helpful.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.5,
      max_tokens: 300
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No response generated.";
    res.json({ reply });
  } catch (error) {
    console.error("Groq API error details:", error);
    res.status(500).json({ 
      error: "Failed to communicate with Groq AI service.",
      details: error.message 
    });
  }
});

export default router;