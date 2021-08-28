const express = require('express');

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users/login', userController.login);
app.post('/users/create', userController.create);
app.get('/posts', postController.index);
app.get('/posts/create', postController.create);

module.exports = app;