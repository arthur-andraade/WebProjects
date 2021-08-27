require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes")
const connectDB = require("./config/DB")
const cors = require("cors");

const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
connectDB();
app.use(router)

app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log("Server running... 🚀 ")
})