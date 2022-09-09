const router=require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User =require("../models/user")
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')



router.get("/user/get/:id",  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



//Register

router.post("/user/register",  (req, res) => {
  const newUser = new User({
    username: req.body.username,
    name:req.body.name,
    email: req.body.email,
    password:req.body.password,
      
   
  });
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(newUser.password, salt, (error, hash) => {
      if (error) throw error;
      newUser.password = hash;
      newUser.save().then(createdUser => res.json(createdUser))
      .catch(error =>  console.log(error));
    });
  });

  
});


//Login



router.post('/user/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  
  User.findOne({ email })
  .then(user => {
    if (!user) {
      res.status(400).json({ msg: 'User not found'});
    } else {

      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            profilepic:user.profilepic,
           
          };

          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          return res.status(400).json({ password: 'Password or email is incorrect' });
        }
      });
    }
  });
});
//update

router.put("/user/:id", async (req, res) => {
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/user/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


 module.exports=router



 