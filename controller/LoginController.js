const User = require("../model/User");
const gerarToken = require("../utils/jwt");

async function signIn(request, response) {
    const dados = request.body;
    const userFinded = await User.findOne({
        email: dados.email
    });

    if (userFinded) {
        const token = gerarToken(dados)
        response.cookie('token', token);
        return response.status(200).send();
    }

    return response.status(400).json({ error: "Usuário não encontrado" });
}

module.exports = {
    signIn
}