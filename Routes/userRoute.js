const express = require("express");
const userSchema = require("../Models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

const mySign = "Random String";

// const middleware = [
//   body("name")
//     .isLength({ min: 5 })
//     .withMessage("must be at least 5 chars long"),
//   body("mobile").isNumeric().withMessage("must be only numbers"),
//   body("username").isEmail().withMessage("Its not a email"),
//   body("passwordConfirmation").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Password confirmation does not match password");
//     }
//     return true;
//   }),
// ];
// router.use(middleware);

const User = userSchema;
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      // console.log(req.body.password, user.password);
      if (cmp) {
        //   ..... further code to maintain authentication like jwt or sessions
        const token = jwt.sign({ id: user._id }, mySign);
        // console.log(token);
        res.json({
          login: true,
          token:token
        });
        // console.log(cmp);
      } else {
        res.send("Wrong username or password.");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  console.log(hash);

  //   sign-in

  const newUser = new userSchema({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    confirmpassword: hash,
  });

  newUser.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("Data inserted");
    }
  });
});

router.get("/getuser", (req, res) => {
  userSchema.find().then((r) => res.send(r));
});

// router.delete("/getuser/:id", (req, res) => {
//   userSchema
//     .findByIdAndDelete(req.params.id)
//     .then((r) => res.send("its deleted"));
// });

// router.put("/getuser", (req, res) => {
//   userSchema
//     .findByIdAndUpdate(req.body.id, { name: req.body.name, id: req.body.age })
//     .then((r) => res.send("its updated"));
// });

//add cart

router.get("/cart", async (req, res) => {
  const owner = req.user._id;
  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
