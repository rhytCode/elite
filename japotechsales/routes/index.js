var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Japotech Sales',state:'',username:'' });
});
router.get('/adminlogin', function (req, res, next) {
  res.render('adminlogin', { title: 'Japotech Sales',state:'',username:'' });
});
router.get('/adminpage', function (req, res, next) {
  res.render('adminpage', { title: 'Japotech Sales' });
});

router.post('/adduser', function (req, res) {
  const mongo = require('mongodb').MongoClient
  const url = 'mongodb://localhost:27017'
  const dbName = 'japotechsales'
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('users')
    collection.insertOne(
      { "name": req.body.names, "email": req.body.email, "password": req.body.password, "usertype":"Admin" },
      (function (error, item) {
        if (error) {
          res.render('adminlogin', { title: 'Japotech Sales', state: 'error' , username:''});
          return
        }
        res.render('adminlogin', { title: 'Japotech Sales', state: 'success', username: req.body.names});
      })
    )
  })
});
router.post('/login', function (req, res) {
  const mongo = require('mongodb').MongoClient
  const url = 'mongodb://localhost:27017'
  const dbName = 'japotechsales'
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('users')
    collection.find({ "email": req.body.email, "password": req.body.password },
      (function (error, item) {
        if (error) {
          res.render('adminlogin', { title: 'Japotech Sales', state: 'invalidlogin' , username:'' });
          return
        }
        res.redirect("adminpage");
      }))
  })
});
router.get('/logout', function (req, res) {
  res.render('adminlogin', { title: 'Japotech Sales', state: 'logout' , username:'' });
});

module.exports = router;
