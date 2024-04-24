const express = require("express");
const Product = require("../models/product");
const router = express.Router();
router.get("/", (req, res, next) => {
  Product.find().then((result) => {
    res.send({ type: "GET" });
  });
});
router.get("/products", (req, res, next) => {
  // Product.find({}).then((result) => {
  //   res.send(result);
  // });

  Product.find({
    geometry: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        $maxDistance: 100000,
      },
    },
  }).then((result) => {
    res.send(result);
  });
});
router.post("/products", (req, res, next) => {
  Product.create(req.body)
    .then((result) => {
      res.send(result);
      console.log("post successful...");
    })
    .catch(next);
});
router.put("/products/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndUpdate({ _id: id }, req.body).then(() => {
    Product.findOne({ _id: id }).then((result) => res.send(result));
  });
});
router.delete("/products/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete({ _id: id }).then((response) => {
    res.send(response);
  });
});

module.exports = router;
