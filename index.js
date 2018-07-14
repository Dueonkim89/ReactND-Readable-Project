require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/serverRoutes');

app.use(express.static('public'));
app.use(cors());

/*
Change of plans. Not creating this middleware. 
if (process.env.NODE_ENV === 'development') {
	app.use((req, res, next) => {
		console.log(req.headers);
		if (!req.headers.authorization) {
			console.log('no authorization');
			req.headers.authorization = Math.random().toString(36).substr(-8);
		}
		console.log(req.headers.authorization);
		next();
	})
}
*/

routes(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets main.js or main.css
  app.use(express.static('frontend/build'));
  //express serve up index.html if route is not recognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001
const origin = process.env.ORIGIN || `http://localhost:${port}`

app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
