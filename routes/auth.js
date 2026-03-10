import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({ name, email, password: hashedPassword })
    await user.save()
    console.log("JWT_SECRET:", process.env.JWT_SECRET)  // ← added
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router