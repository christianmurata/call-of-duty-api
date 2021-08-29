const express = require('express');
const cors = require('cors');

/**
 * Image upload
 * 
 * @see https://flaviocopes.com/how-to-upload-files-fetch/
 * @see https://gist.github.com/emersonbrogadev/e9de58950d2efbaca5a4b84515d01afe
 */

require('dotenv').config();

const routes = require('./routes');
const database = require('./services/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static('uploads'));

database.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.HTTP_PORT || 3000, () => {
    console.log(`Call Of Duty api listening at http://localhost:${process.env.HTTP_PORT}`);
  });
})

.catch(err => console.error(err.message));
