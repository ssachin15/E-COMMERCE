import express from "express"
import auth from "../middleware/auth.js"
import isAdmin from "../middleware/isAdmin.js"
import Order from "../models/Order.js"
const router = express.Router()
// Get my orders
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product")
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get all orders (admin only)
router.get("/all", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product")
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update order status (admin only)
router.put("/status/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json({ message: "Order status updated", order })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router