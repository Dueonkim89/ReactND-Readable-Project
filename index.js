require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/serverRoutes');

app.use(express.static('public'));
app.use(cors());

routes(app);

const port = process.env.PORT || 3001
const origin = process.env.ORIGIN || `http://localhost:${port}`

app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
