const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes")

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(8080, () => {
    console.log("Rodando")
})