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
        return res.status(400).json('Login já em uso');

      return res.status(400).json(
        err.errors?.login?.message || err.errors?.password?.message || err.message
      );
    });
  }

  login(req, res) {
    const { login, password } = req.body;

    User.findOne({ login }, '-posts').then(user => {
      if(!user)
        return res.status(404).send('Login inválido ou não cadastrado');

      user.comparePassword(password, (err, isMatch) => {
        if(err)
          return res.status(400).json(err.message);

        if(!isMatch)
          return res.status(400).json('Senha inválida');

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { 
          noTimestamp: true, 
          expiresIn: '1h' 
        });

        return res.json({ token });
      });
    })

    .catch(err => res.status(400).json(err.message));
  }
}

module.exports = new UserController();