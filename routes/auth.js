const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//  create a user using : POST "/api/auth/createuser".No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 6 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast of 8 characters').isLength({ min: 8 }),
], async (req, res) => {

  //  if there are  errors, retirn Bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //  Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).json({ error: "Sorry a user with this email already exists" })
    }
    // create an new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })


    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error:'Please enter a unique value'})})
    res.json({ user })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})

module.exports = router
