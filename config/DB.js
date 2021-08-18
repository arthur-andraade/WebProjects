const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        process.env.URL_DB,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
}

module.exports = connectDB;