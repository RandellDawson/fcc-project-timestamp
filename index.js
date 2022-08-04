const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {
  const submittedDate = req.params.date;
  console.log(submittedDate);
  const date = submittedDate ? new Date(submittedDate) : new Date();
  console.log(date);
  res.json({date});
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
