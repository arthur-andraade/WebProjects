const JWT = require("jsonwebtoken");

function gerarToken(dados){
    const token = JWT.sign(
        {
            id: dados.id,
            nome: dados.name || dados.email
        },
        process.env.JWT_KEY,
        {
            algorithm: "HS256"
        }
    )

    return token;
}

module.exports = gerarToken;