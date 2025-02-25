require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Routes = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

//kết nous DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// khai báo Routes
app.use("/api/users", Routes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));