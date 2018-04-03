const env = require('dotenv');
const express = require('express');

const app = express();
const cors = require('cors')
const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== 'production') {
  env.load();
}

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE
});



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/route/:token', (req, res) => {
  const token = request.params.token;
  res.send({ express: 'Hello From Express' });
});

app.post('/route', function (req, res) {
  if(req.body.directionRequest) {
    let { origin, destination, travelMode } = req.body.directionRequest
    let originCords = [origin.lat, origin.lng]
    let destinationCords = [destination.lat, destination.lng]
    let direction = { origin, destination}
    googleMapsClient.directions(direction,function(err, response) {
      if (!err) {
        res.send(response.json)
      } else {
        console.log(err, 'failed');
        res.send({ "error": "Invalid waypoints" })
      }
    })
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
