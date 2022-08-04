const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

const returnDates = (res, date) => {
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
};

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (_, res) => {
  returnDates(res, new Date(Date.now()));
});

app.get("/api/:date", (req, res) => {
  const submittedDate = req.params.date;
  let date = new Date(submittedDate);
  if (date.toString() === "Invalid Date") {
    date = new Date(Number(submittedDate)); // assumes date input is in milliseconds
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
    else {
      returnDates(res, date);
    }
  }
  else {
    returnDates(res, date);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
