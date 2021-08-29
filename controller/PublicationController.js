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

async function search(request, response) {
    const { search } = request.query;

    if (!search) {
        try {
            const publications = await Publication.find().limit(10);
            return response.status(200).json({ publications });
        } catch (error) {
            return response.status(405).json({ error });
        }
    }

    try {
        const searchRegex = new RegExp(search, "i");

        const publications = await Publication.find({
            $or: [{ title: searchRegex }, { content: searchRegex }]
        });

        return response.status(200).json({ publications });
    } catch (error) {
        return response.status(405).json({ error });
    }
}

module.exports = {
    create,
    search
}