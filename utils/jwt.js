const JWT = require("jsonwebtoken");

function gerarToken(dados){
    const token = JWT.sign(
        {
            id: 1,
            nome: dados.nome
        },
        "projetoweb",
        {
            algorithm: "HS256"
        }
    )

    return token;
}

module.exports = gerarToken;