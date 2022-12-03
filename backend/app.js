const config = require("./config/");

const app = require("./definitions");

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});