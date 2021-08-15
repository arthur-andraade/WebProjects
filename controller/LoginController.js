const gerarToken = require("../utils/jwt");

function signIn(request, response) {
    const body = request.body;
    if (body.nome && body.senha) {
        const token = gerarToken(body)
        response.cookie('token', token);
        return response.status(200).send();
    }

    return response.status(400).send();
}

module.exports = {
    signIn
}