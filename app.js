var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var tp = require("tedious-promises");

var indexRouter = require("./routes/index");

tp.setConnectionConfig({
  userName: "user_trial",
  password: "7412LIVE!@#$&*()",
  server: "virtual2.febracorp.org.br",
  options: {
    database: "CONTOSO",

  },
});
tp.setPromiseLibrary('es6');
var app = express();

app.use(bodyParser.json());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);



app.listen(8000, () => {
  console.log("Servidor funcional.");
});

module.exports = app;
