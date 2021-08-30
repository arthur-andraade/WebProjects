require("dotenv").config();
const express = require("express");
const router = require("./routes")
const connectDB = require("./config/DB")
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())
connectDB();
app.use(router)

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running... 🚀 ")
})