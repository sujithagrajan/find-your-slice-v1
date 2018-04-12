//https://find-your-slice-iqatfsivmu.now.sh

require('dotenv').config();
var fs = require('fs')
var path = require('path');
const axios = require("axios");
var express = require('express');
var app = express();
app.use(express.static('public'));

class Yelp {
  constructor({ 
    apiKey = "suKaYsvADxWXThI24D_Fp-fCvPjYlSF5wN9A29AYoAm46MC39FpudXyfVox-f5TsLAF3zYtSZLYtzsv7CXw3SWgzL8hXyDdmIdCgKnc7uMfSFXO0qA3cgNUKUc2mWnYx"
   }) 
   {
    this.fetch = axios.create({
      baseURL: "https://api.yelp.com/v3",
    });
    // Alter defaults after instance has been created
    this.fetch.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    this.fetch.defaults.headers.common['Content-Type'] = "application/json";
  }
  search(params = {}) {
    return this.fetch("/businesses/search", { params })
      .then(res => res.data);
  }
}

const yelp = new Yelp({ apiKey: process.env.YELP_API_KEY })

app.get('/api/search', function (req, res) {
  var term = req.query.term;
  var location = req.query.location;

  if (!term || !location) {
    res.json({
      error: 'You must include a term and a location!'
    });
  }

  yelp.search({ term, location })
    .then(data => {
      return res.json(data);
    })
    .catch((e) => {
      console.error("Error", e);
    });
});
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(process.env.PORT||3000, function() {
  console.log('listening at localhost:3000');
});
