/*app.use(function(req, res, next) {
  var sess = req.session;
  var sessionId = sess.id;
  console.log(sessionId);
  var client = redis.createClient(REDISPORT,REDISIP);
  client.on("error", function (err) {
    console.log("Error " + err);
  });
  var session = null;
  client.hgetall(sessionId, function (err, replies) {
        if(err){
          console.log(err);
        }else{
          console.log('redis:' + replies);
          session = replies;
          if(session){
            session.views++;
            res.end('login!' + session.views);
          }else{
            session = sess;
            session.views = 1;
            res.end('welcome to the session demo. refresh!');
          }
          console.log('session:' + session);
          client.hmset(sessionId,session,function(error, res) {
              if(error) {
                  console.log(error);
              } else {
                  console.log(res);
              }
              // 关闭链接
              client.end();
          });
      }
  });
})*/