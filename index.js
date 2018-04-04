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
let directions;

app.get('/route/:token', (req, res) => {
  const token = req.params.token;
  if(directions.geocoded_waypoints) {
    let leg = directions.routes[0].legs[0]
    eCord = leg.end_location
    sCord = leg.start_location
    let directionResponse = {
      "status": "success",
      "path": [[sCord.lat, sCord.lng], [eCord.lat, eCord.lng]],
      "total_distance": leg.distance.value,
	    "total_time": leg.duration.value
    }
    res.send(directionResponse)
  } else if (!directions) {
    res.send({
      "status": "failure",
	    "error": "DIRECTIONS UNSET"
    })
  } else {
    res.send({"status": "in progress"})
  }

});

app.post('/route', function (req, res) {
  if(req.body.length === 2){
    directions = "IN PROGRESS"
     let direction = { origin: req.body[0], destination: req.body[1], units: 'metric'}
      googleMapsClient.directions(direction,function(err, response) {
        if (!err) {
          directions = response.json
          res.send({token: "axjl-123XL"})

        } else {
          console.log(err, 'failed');
          res.send({ "error": "Invalid waypoints" })
        }
      })


  } else {
    res.send({error: "Please send a valid Direction Request"})
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
