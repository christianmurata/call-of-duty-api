class PostController {
  index(req, res) {
    res.send('index post');
  }
  
  create(req, res) {
    res.send('create post');
  }
}

module.exports = new PostController();