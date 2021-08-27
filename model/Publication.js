const mongoose = require("mongoose");
const { schema: UserSchema } = require("./User")

const PublicationSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    image_url: {
        type: String,
        required: false
    },
    author: {
        required: true,
        type: UserSchema
    }
});

module.exports = mongoose.model("Publication", PublicationSchema);