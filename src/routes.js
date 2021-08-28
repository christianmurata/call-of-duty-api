const express = require('express');

const verifyJWT = require('./middlewares/verifyJwt');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users/login', userController.login);
app.post('/users/create', userController.create);
app.get('/posts', verifyJWT, postController.index);
app.post('/posts/create', verifyJWT, postController.create);

module.exports = app;