function loginValidator(request, response, next) {
    const data = request.body;
    if (!data.email) {
        return response.status(400).json({ error: "Necessário um email para fazer login" });
    }

    if (!data.password) {
        return response.status(400).json({ error: "Necessário uma senha para fazer login" });
    }

    next();
}

module.exports = loginValidator;