const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const auth = req.headers.authorization;

  if(!auth) return res.status(401).json({ message: 'Token é obrigatório' });

  const [, token] = auth.split(' ');
  
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(400).json({ message: 'Token inválido' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;

    next();
  });
}

module.exports = verifyJWT;