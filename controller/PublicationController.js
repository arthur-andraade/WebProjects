const { User } = require("../model/User")
const Publication = require("../model/Publication");

async function create(request, response) {
    const data = request.body;

    try {
        const author = await User.findById(data.user.id);
        const publication = await Publication.create({
            title: data.title,
            content: data.content,
            author
        });

        return response.status(201).json({ publication });
    } catch (error) {
        return response.status(403).json({ error });
    }
}

module.exports = {
    create
}