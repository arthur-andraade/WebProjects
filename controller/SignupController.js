const User = require('../model/User');

module.exports = {

  async register(request, response){
    const { email } = request.body;

    try{
      if (await User.findOne({ email })){
        return response.status(409).json({ error: 'Já existe um usuário cadastrado com esse e-mail!'})
      }

      const user = await User.create(request.body);
      return response.status(200).json({ user })
    }
    catch(error){
      return response.status(400).json({ error: 'Erro ao realizar o cadastro'});
    }
  }
}