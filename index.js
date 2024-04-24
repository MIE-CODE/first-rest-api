const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost/productgo");
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
  console.log(err);
});
app.listen(process.env.port || 4000, () => {
  console.log("now listening for request...");
});
app.get("/api", (req, res) => {
  res.send({
    name: "dave",
  });
});
