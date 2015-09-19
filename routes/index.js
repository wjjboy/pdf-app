var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query;
  var user = query.user;
  var password = query.password;  
  var sess = req.session;
  if(sess.login){
    sess.view ++;
    res.end('Express viewTime' + sess.view);
  }else{
    if(user && password){
      if('wjj' == user && 'pdf' == password){
        sess.login = true;
        if(sess.view){
            sess.view ++ ;
        }else{
            sess.view = 1;
        }
        res.end('Express viewTime' + sess.view);
      }else{
        res.end('login error!');
      }
    }else{
      res.end('login error!');
    }
  }
  /*console.log('sessionId:' + sess.id + ' views:' + sess.view);
  if(sess.view){
    sess.view ++ ;
  }else{
    sess.view = 1;
  }*/
  
  //res.render('index', { title: 'Express viewTime' + sess.view });
  
});

module.exports = router;
