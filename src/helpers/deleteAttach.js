const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const deleteAttach = async(attachPath) => {
  if(!attachPath) return;

  // Delete the file like normal
  await unlinkAsync(attachPath);
};

module.exports = deleteAttach;