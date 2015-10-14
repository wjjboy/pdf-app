var ejs = require('ejs');
var express = require('express');
var router = express.Router();

//url mapping
router.get('/', function (req, res, next) {
    res.redirect('/index');
});
router.get('/index', index);
router.get('/login', doLogin);
router.get('/logout', doLogout);



function index(req, res, next) {
    var session = req.session;
    if (session.user) {
        if (session.view) {
            session.view++;
        } else {
            session.view = 1;
        }
        res.render('home', { view: session.view });
    } else {
        res.render('index');
    }
}

function doLogin(req, res, next) {
    // 校验
    req.checkQuery('user', "用户名不能为空").notEmpty();
    req.checkQuery('password', "密码不能为空").notEmpty();
    var errors = req.validationErrors();
    if (errors && errors.length > 0) {
        var errmsg = [];
        for (var i = 0; i < errors.length; i++) {
            errmsg.push(errors[i].msg);
        }
        var json = { title: '请先登录', error: errmsg.join("\n") };
        res.render('index', json);
        return;
    }
    var user = req.query.user;
    var password = req.query.password;
    var ip = req.ip;
    var session = req.session;
    if ('wjj' == user && 'pdf' == password) {
        session.user = user;
        if (session.view) {
            session.view++;
        } else {
            session.view = 1;
        }
        res.render('home', { view: session.view });
    } else {
        res.end('login error!');
    }
}

function doLogout(req, res, next) {
    req.session.destroy(function (err) {
        new Error(err);
    });
    res.redirect('/index');
}
module.exports = router;
