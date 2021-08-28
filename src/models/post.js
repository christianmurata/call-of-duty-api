const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Titulo do post é obrigatório'],
    unique: true,
  },
  body: {
    type: String,
    required: [true, 'Conteúdo do post é obrigatório'],
  },
  attach: {
    type: String,
    default: null
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  }
});

module.exports = mongoose.model('Post', PostSchema);