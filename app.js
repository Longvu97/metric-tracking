const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const metricRouters = require('./routers/metric-routers');

global.env = process.env;
const routers = [
  metricRouters,
];

global.jsonSuccess = (data) => {
  return {
    success: true,
    result: data,
  };
};

global.jsonError = (msg) => {
  return {
    success: false,
    messenge: msg,
  };
};

mongoose.connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connect mongodb successs');
    const app = express();
    app.use(bodyParser.json());
    for (const router of routers) {
      app.use(`/api/${router.path}`, router.router);
    }

    app.listen(env.PORT, () =>
      console.log(`Running port ${env.PORT}...`),
    );
  }).catch((err) => {
    console.log(err);
  });
