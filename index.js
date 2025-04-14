// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.send("Timestamp Microservice");
});

// your first API endpoint...
app.get("/api/:fecha?", (req, res) => {
  const dateString = req.params.fecha;

  let date;
  // Si no se proporciona fecha, usamos la fecha actual
  if (!dateString) {
    date = new Date(); // fecha actual
  } else if (!isNaN(dateString)) {
    // Si es un número, interpretamos como timestamp
    date = new Date(parseInt(dateString));

    console.log(date);
  } else {
    // Si no es un número, interpretamos como fecha en formato ISO
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
