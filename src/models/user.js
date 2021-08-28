const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login é obrigatório'],
    min: [3, 'Login deve ter 3 caracteres pelo menos'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    min: [3, 'Email deve ter 3 caracteres pelo menos'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    min: [3, 'Senha deve ter 3 caracteres pelo menos'],
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  posts: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' 
  }]
});

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        
        next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);