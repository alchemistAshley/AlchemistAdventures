var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({
    limit: '50mb',
    parameterLimit:100000
}));
app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit:100000
}));


app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Magic happening at localhost:" + PORT);
  });
});
