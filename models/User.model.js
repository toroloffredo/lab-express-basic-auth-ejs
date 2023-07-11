// TODO: Please make sure you edit the user model to whatever makes sense in this case
const { Schema, model } = require('mongoose')

const userSchema = new Schema(
{
  username: {
    type: String,
    trim: true,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  // passwordHash 
  passwordHash: {
    type: String,
    required: true,
  },
},
);

const User = model('User', userSchema)

module.exports = User