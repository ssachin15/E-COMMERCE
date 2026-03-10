import dotenv from "dotenv"
dotenv.config()

import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import orderRoutes from "./routes/order.js"
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
connectDB();        
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});