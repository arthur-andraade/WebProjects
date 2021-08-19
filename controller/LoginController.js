const User = require("../model/User");
const bcrypt = require("bcryptjs")
const gerarToken = require("../utils/jwt");

async function signIn(request, response) {
    const data = request.body;
    const userFinded = await User.findOne({
        email: data.email
    });

    if (userFinded) {
        const passwordIsCorrect = await bcrypt.compare(data.password, userFinded.password);
        if (passwordIsCorrect) {
            const token = gerarToken(data);
            response.cookie('token', token);
            return response.status(200).send();
        }

        return response.status(400).json({ error: "Senha incorreta" });
    }

    return response.status(400).json({ error: "Usuário não encontrado" });
}

module.exports = {
    signIn
}