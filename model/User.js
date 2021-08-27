const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password:{
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();

});

module.exports = {
  User: mongoose.model('User', UserSchema),
  schema: UserSchema  
}