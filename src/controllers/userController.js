const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/user');

class UserController {
  create(req, res) {
    const { login, password } = req.body;

    const user = new User({
      login: login.toLowerCase(),
      password: password
    });

    user.save()
    
    .then(newUser => {
      const { password, ...responseUser } = newUser._doc;

      return res.json(responseUser);
    })
    
    .catch(err => {
      if(err.code === 11000)
        return res.status(400).json({ message: 'Login já em uso' });

      return res.status(400).json({
        message: err.errors?.login?.message
          || err.errors?.email?.email
          || err.errors?.password?.message 
          || err.message
      });
    });
  }

  login(req, res) {
    const { login, password } = req.body;

    User.findOne({ login }, '-posts').then(user => {
      if(!user)
        return res.status(404).json({ message: 'Login inválido ou não cadastrado' });

      user.comparePassword(password, (err, isMatch) => {
        if(err)
          return res.status(400).json({ message: err.message });

        if(!isMatch)
          return res.status(400).json({message: 'Senha inválida'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { 
          noTimestamp: true, 
          expiresIn: '1h' 
        });

        return res.json({ token, admin: user.admin });
      });
    })

    .catch(err => res.status(400).json({ message: err.message }));
  }
}

module.exports = new UserController();