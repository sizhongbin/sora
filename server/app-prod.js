// Keep this line different between PROD and TEST
const env = require('./env-prod.js');


const express = require('express');

// Routers
const app = express();
app.use(express.json());
const accountRouter = require(env.routersPath + 'account');

app.use('/account', accountRouter);
app.get('/', (req, res) => {
  res.send('Sora TEST API');
});
app.use((req, res, next) => {
  res.status(404).send();
});

// Keep this line different between PROD and TEST
app.listen(3690, () => {
  console.log('Sora PROD on port 3690');
});
