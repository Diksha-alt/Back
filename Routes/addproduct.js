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

router.get("/addcart", async (req, res) => {
  const UserId = req.body.userId;
    try{
        let cart = await CartSchema.findOne({UserId});
        console.log(cart)
        if(cart || cart.length>0){
            res.send(cart);
        }
        else{
            res.send("empty cart",null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }

})

router.get("/addcartitems", async (req, res) => {
  const userId = req.body.userId;
  const { productId, quantity} = req.body;

    try{
      const cart = await CartSchema.findOne({userId});
      const item = await productSchema.findOne({_id: productId});
      if(!item){
        res.status(404).send('Item not found!')
    }
        const price = item.price;
        const name = item.productName;
    console.log(price)
        if(cart){
          // if cart exists for the user
          let itemIndex = cart.findIndex(p => p.productId == productId);
        }
         // Check if product exists or not
         if(itemIndex > -1)
         {
             let productItem = cart.items[itemIndex];
             productItem.quantity += quantity;
             cart.items[itemIndex] = productItem;
         }
         else {
             cart.items.push({ productId, name, quantity, price });
         }
         cart.bill += quantity*price;
         cart = await cart.save();
         return res.status(201).send(cart);
     }
     else{
         // no cart exists, create one
         const newCart = await Cart.create({
             userId,
             items: [{ productId, name, quantity, price }],
             bill: quantity*price
         });
         return res.status(201).send(newCart);
     }       
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
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
