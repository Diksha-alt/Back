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


router.post("/oldaddcart", async (req, res) => {
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
    res.status(500).send(error);
  }

})


// router.post("/creatcart", async (req, res) => {
//   try {



   
    // const newCart = await CartSchema.create({
    //   userId: req.body.userId,
    //   items: [{ productId: req.body.productId, quantity: req.body.quantity }]

    // });
    // res.status(200).json({ newCart })
    // if(!newCart){
    //   const newwCart = await CartSchema.create({
    //     userId: req.body.userId,
    //     items: [{ productId: req.body.productId, quantity: req.body.quantity }]
  
    //   });
    //   res.status(200).json({ newwCart })
    // }
    //   else{
    //     const productCart=  await CartSchema.findOneAndUpdate({
    //       items: [{ productId: req.body.productId, quantity: req.body.quantity }]
    //     })
        
    //     res.status(201).json(productCart);
    //     console.log("product addedd",productCart)
    //   }
      
      // let itemIndex = newCart.items.findIndex(p => p.productId == productId);
    // }
    // console.log(itemIndex)

//    catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }

// })











router.get("/addcart", async (req, res) => {
  const UserId = req.body.UserId;
  try {
    let cart = await CartSchema.findOne({ UserId });
    // console.log(cart)
    if (cart ) {
      res.send(cart);
    }
    else {
      // const newCart = await CartSchema.create({
      //  userId: req.body.userId,
      //    items: [{ productId: req.body.productId, quantity: req.body.quantity }]
      // })
      // res.status(200).json({ newCart })
      res.send("empty cart")
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

})


router.post("/addcartitems", async (req, res) => {
  const userId = req.params.id;
  const {productId, quantity} = req.body;
  try{
    let cart = await CartSchema.findOne({userId});
    let item = await CartSchema.findOne({id_:productId})
    

    if(!item){
      res.status(404).send("Items is not found")
    }
    if(cart){
      let itemIndex = cart.items.findIndex(p =>p.productId == productId)
      console.log("Item",itemIndex)
      
    if(itemIndex>-1){
      let productItem = cart.items[itemIndex];
      productId.items += quantity
      cart.items[itemIndex] = productItem 
    }
    else{
      cart.items.push({productId,quantity})
      res.send("Product added in cart");
    }
    
  }
  
  else{
    const newCart = await CartSchema.create({
      userId: req.body.userId,
        items: [{ productId: req.body.productId, quantity: req.body.quantity }]
     })
     res.status(200).json({ newCart })
  }
  }
  catch(err){
    res.status(500).send(err)
  }

})



// router.get("/addcartitems", async (req, res) => {
//   const userId = req.body.userId;
//   const { productId, quantity } = req.body;

//   try {
//     const cart = await CartSchema.findOne({ userId });
//     const item = await productSchema.findOne({ _id: productId });
//     if (!item) {
//       res.status(404).send('Item not found!')
//     }
//     const price = item.price;
//     const name = item.productName;
//     console.log(price)
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }

// })


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
