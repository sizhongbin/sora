const express = require('express');

// TEST
const appTest = express();
appTest.use(express.json());
const accountRouterTest = require('./test/account');

appTest.use('/account', accountRouterTest);
appTest.get('/', (req, res) => {
  res.send('Sora TEST API');
});
appTest.use((req, res, next) => {
  res.status(404).send();
})

appTest.listen(3691, () => {
  console.log(`Example app listening on port 3691`);
});

// PROD
const appProd = express();
appProd.get('/', (req, res) => {
  res.send('Sora PROD API');
});

appProd.listen(3690, () => {
  console.log(`Example app listening on port 3690`);
});

