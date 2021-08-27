const JWT = require("jsonwebtoken");

function auth(request, response, next) {
    try {
        const token = request.cookies["token"];
        const tokenDecodificado = JWT.verify(token, "projetoweb");
        request.body = {
            ...request.body,
            user: {
                id: tokenDecodificado.id,
                nome: tokenDecodificado.name 
            }
        }
        next();
    } catch (error) {
        return response.status(401).send();
    }
}

module.exports = auth;