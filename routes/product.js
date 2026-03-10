import product from "../models/product.js"
import auth from "../middleware/auth.js"
import isAdmin from "../middleware/isAdmin.js"  
import express from "express"


const router = express.Router()
router.post("/add", auth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, category } = req.body     
    const newProduct = new product({ name, description, price, category })      
    await newProduct.save()
    res.status(201).json({ message: "Product added successfully", product: newProduct })
  } catch (error) {
    console.error("Error adding product:", error)
    res.status(500).json({ message: "Server error" })
  } 

})

router.get("/all", async (req, res) => {
  try {
    const products = await product.find()               
    res.status(200).json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:id", async (req, res) => {  
    try {       
        const productId = req.params.id
        const productData = await product.findById(productId)
        if (!productData) {     
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ product: productData })
    } catch (error) {
        console.error("Error fetching product:", error)
        res.status(500).json({ message: "Server error" })
    }
})

router.put("/update/:id", auth, isAdmin, async (req, res) => {  
    try {       
        const productId = req.params.id 

        const { name, description, price, category } = req.body
        const updatedProduct = await product.findByIdAndUpdate(
            productId,  
            { name, description, price, category },
            { new: true }
        )       
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }       
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct })
    } catch (error) {
        console.error("Error updating product:", error)
        res.status(500).json({ message: "Server error" })
    }       
})

router.delete("/delete/:id", auth, isAdmin, async (req, res) => {           
    try {
        const productId = req.params.id
        const deletedProduct = await product.findByIdAndDelete(productId)       
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }   
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.error("Error deleting product:", error)
        res.status(500).json({ message: "Server error" })
    }   
})

export default router