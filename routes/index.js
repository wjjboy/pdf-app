var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  console.log(sess.id);
  if(sess.view){
    sess.view ++ ;
  }else{
    sess.view = 1;
  }
  
  res.render('index', { title: 'Express viewTime' + sess.view });
});

module.exports = router;
