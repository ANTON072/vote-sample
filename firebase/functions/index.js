const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');
const Vote = require('./routes/Vote');

const whitelist = ['http://localhost:5000'];

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
      return null;
    } else {
      callback(new Error('Not allowed by CORS'));
      return null;
    }
  }
};

const app = express();
const vote = new Vote();

app.get('/api/vote', vote.render);

app.use(cors(corsOptions));

exports.app = functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}`;
  }
  return app(req, res);
});
