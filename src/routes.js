const express = require('express');
const multer = require('multer');

const verifyJWT = require('./middlewares/verifyJwt');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const app = express();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users/login', userController.login);
app.post('/users/create', userController.create);
app.get('/posts', verifyJWT, postController.index);
app.post('/posts/create', verifyJWT, upload.single('attach'), postController.create);

module.exports = app;