const express = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const http = require('http');
const keys = require('./server/config/keys');
const allRoutes = require('./server/routes/index');

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Registers body parsing middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Registers coors headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Imports router
app.use(allRoutes);

// Handles serving production assets on deployment
if (process.env.NODE_ENV === 'production') {
  // Serve build assets
  app.use(express.static('client/build'));

  // Serve index.html from /build for base route (catch all)
  app.get('*', (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Node.js listening on port ${PORT}`);
});
