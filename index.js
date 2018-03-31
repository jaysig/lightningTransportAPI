const env = require('dotenv');
const express = require('express');

const app = express();
const cors = require('cors')
const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== 'production') {
  env.load();
}
console.log(process.env.GOOGLE,'google');
console.log(process.env.FOO,'foo');



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/route/:token', (req, res) => {
  const token = request.params.token;
  res.send({ express: 'Hello From Express' });
});

app.post('/route', function (req, res) {
  console.log(req.body,'req check');
  if(req.body) {
    res.send('POST request to the homepage')
  } else {
    res.send({ "error": "ERROR_DESCRIPTION" })
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
