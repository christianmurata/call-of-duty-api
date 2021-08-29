const Post = require('../models/post');
const User = require('../models/user');
const deleteAttach = require('../helpers/deleteAttach');

class PostController {
  index(req, res) {
    let filter = {};
    const { title } = req.query;

    if(title)
      filter = { title: new RegExp(title, 'i') };

    Post.find(filter)
    
    .then(posts => res.json(posts))
    
    .catch(err => res.status(400).json({ message: err.message }))
  }
  
  async create(req, res) {
    const { title, body, attach } = req.body;

    const user = await User.findById(req.userId);
    const post = new Post({ title, body, attach: req.file?.path || null, user: req.userId }); 

    if(!user.admin) {
      deleteAttach(req.file?.path);

      return res.status(401).send({ message: 'Este usuário não possui permissão para postar' });
    }

    if(!req.file?.mimetype.match(/image/i)) {
      deleteAttach(req.file?.path);

      return res.status(401).send({ message: 'Arquivo inválido. Escolha uma imagem' });
    }

    post.save().then(post => {
      User.findById(post.user).then(user => {
        user.posts = [...user.posts, post];
        user.save().then(user => res.json(post))
      })
    })

    .catch(err => {
      deleteAttach(req.file?.path);

      if(err.code === 11000)
        return res.status(400).json({ message: 'Já existe um post com esse titulo' });

      return res.status(400).json({
        message: err.errors?.title?.message || err.errors?.body?.message || err.message
      })
    });
  }
}

module.exports = new PostController();