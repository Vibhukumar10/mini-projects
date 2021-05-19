const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "811ebff51305f423eae03449f6248017";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently: " + description + "</p>");
      res.write(
        "<h1>The current temperature in " +
          query +
          " is: " +
          temp +
          " degrees Celcius</h1>"
      );
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000);
