const mongoose = require('mongoose');

class Database {
  connect(url) {
    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  }
};

module.exports = new Database();