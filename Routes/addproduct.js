const express = require("express");
const router = express.Router();
const productSchema = require("../Models/productschema");
const multer = require("multer");
const CartSchema = require("../Models/cartSchema")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


router.post("/addcart", async (req, res) => {
  try {
    const newProduct = new CartSchema({
      price: req.body.price,
      userId: req.body.userId
    });

    newProduct.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({ data });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }

})


router.post("/addproduct", upload.single("image"), async (req, res) => {
  const { productName, quantity, size, price, image } = req.body;
  console.log("file", req.file);
  //   res.send("aa");

  try {
    const newProduct = new productSchema({
      productName,
      quantity,
      size,
      price,
      image: req.file.filename,
    });

    newProduct.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({ data });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

router.get("/addproduct", (req, res) => {
  productSchema.find().then((r) => res.send(r));
});

module.exports = router;
