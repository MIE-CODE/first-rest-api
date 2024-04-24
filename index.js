const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const dbURI =
  "mongodb+srv://MIE:meyangs126@cluster0.slzl1aq.mongodb.net/blog-store?retryWrites=true&w=majority&appName=Cluster0";
const port = 5000;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(process.env.port || port, () => {
      console.log(`now listening for request on port ${port}`);
    });
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
  console.log(err);
});

app.get("/api", (req, res) => {
  res.send({
    name: "dave",
  });
});
