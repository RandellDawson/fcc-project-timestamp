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

const isValidDate = (date) => date.toString() !== "Invalid Date";

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  const submittedDate = req.params.date;
  let date = submittedDate ? new Date(submittedDate) : new Date();
  if (!isValidDate(date)) {
    /* Assume date input might be in milliseconds */
    date = new Date(Number(submittedDate));
    return isValidDate(date)
      ? returnDates(res, date)
      : res.json({ error: "Invalid Date" });
  }
  returnDates(res, date);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App is listening on port ' + listener.address().port);
});
