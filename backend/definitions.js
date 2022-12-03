const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./models/");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const awardApi = require("./routes/awards");
const parameterApi = require("./routes/parameters");
const playersApi = require("./routes/players");
const teamsApi = require("./routes/teams");

awardApi(app);
parameterApi(app);
playersApi(app);
teamsApi(app);

module.exports = app;
