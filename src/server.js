const express = require('express');
const cors = require('cors');

require('dotenv').config();

const routes = require('./routes');
const database = require('./services/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

database.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.HTTP_PORT, () => {
    console.log(`Call Of Duty api listening at http://localhost:${process.env.HTTP_PORT}`);
  });
})

.catch(err => console.error(err.message));
