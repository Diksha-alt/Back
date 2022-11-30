const express = require("express");
const router = express.Router();
const productSchema = require("../Models/productschema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/addproduct", upload.single("image"), async (req, res) => {
  const { productName, quantity, description, price, image } = req.body;
  console.log("file", req.file.filename);

  try {
    const newProduct = new productSchema({
      productName,
      quantity,
      description,
      price,
      image: req.file.filename,
    });

    newProduct.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send("Product added");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

module.exports = router;
