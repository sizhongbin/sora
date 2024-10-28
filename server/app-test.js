// Keep this line different between PROD and TEST
const env = require('./routers-test/env.js');

// Init
const express = require('express');
const app = express();
app.use(express.json());

// Routers
const accountRouter = require(env.routersPath + 'account');
app.use('/account', accountRouter);

// Hand-shake
app.get('/', (req, res) => {
  res.send('Sora TEST API');
});

// 404
app.use((req, res, next) => {
  res.status(404).send();
});

// Keep this line different between PROD and TEST
app.listen(3691, () => {
  console.log('Sora TEST on port 3691');
});
