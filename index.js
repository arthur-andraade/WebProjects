const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes")

const app = express();
app.use(cookieParser())
app.use(express.json())


const connectDB = async () => {
    await mongoose.connect("",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
}

connectDB();


app.use(router)

app.listen(8080, () => {
    console.log("Server running... 🚀 ")
})