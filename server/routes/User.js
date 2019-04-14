const express = require("express");
var parseurl = require('parseurl')
var session = require('express-session')



let user = require("../controllers/UsersController");
let router = express();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})


router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

router.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

router.get("/", user.getAll);
router.get("/:id", user.find);

router.post("/create", user.create);

router.put("/", user.update);
router.delete("/:id", user.delete);

module.exports = router;