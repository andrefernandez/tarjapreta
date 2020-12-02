const express = require("express");
const path = require("path");
const axios = require("axios");
const exphbs = require("express-handlebars");

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const app = express();

const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    json: function(context) {
      return JSON.stringify(context);
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));
app.use("/static", express.static(__dirname + "/static"));

hbs.handlebars.registerHelper('ifCond', function (v1, options) {
    if( v1 == 357 || v1 == 350 || v1 == 192 || v1 == 352){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
});

app.get("/", async (req, res) => {
  const date = new Date();
  const { data } = await axios.get(`https://api.donttouch.com.br/timeslot?month=${date.getMonth() + 1}&year=${date.getFullYear()}`);
  const rows = data.data.length / 3;
  res.render("index", {
    artists: shuffle(data.data),
    rows: Array.from({ length: rows }, (k, v) => v + 1),
    helpers: {
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  });
});

app.get("/:slug", async (req, res) => {
  const date = new Date();
  const { data } = await axios.get(`https://api.donttouch.com.br/timeslot?month=${date.getMonth() + 1}&year=${date.getFullYear()}`);
  const rows = data.data.length / 3;
  res.render("index", {
    artists: data.data,
    rows: Array.from({ length: rows }, (k, v) => v + 1),
    helpers: {
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  });
});

app.listen(17337, () => {
  console.log("Boa porra! Lança no browser ai localhost:8000");
});