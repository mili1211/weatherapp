var express = require('express');
var router = express.Router();
var request = require('sync-request');

const userModel = require('../models/users');

/* Sign-up */
router.post('/sign-up', async function (req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (searchUser == null) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })

    var userSaved = await newUser.save();

    req.session.user = {
      username: userSaved.username,
      id: userSaved._id,
    }
    res.redirect('/weather')
  } else {
    res.redirect('/')
  }


});

/* Sign-in */
router.post('/sign-in', async function (req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  })

  if (searchUser != null) {
    req.session.user = {
      username: searchUser.username,
      id: searchUser._id,
    }
    res.redirect('/weather')
  } else {
    res.render('login')
  }
});

/* Logout */
router.get('/logout', function (req, res, next) {

  req.session.user = null

  res.redirect('/')
})



module.exports = router;
