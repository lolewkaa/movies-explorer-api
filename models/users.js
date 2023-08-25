const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Укажите верный e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: [],
  },
});

userSchema.methods.toJSON = function passwordDelete() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('users', userSchema);
