
/**
 * Module dependencies.
 */

var express = require('express');

// 路由文件
var routes = require('./routes');
var mongodb = require('./routes/mongodb');
var webchat = require('./routes/webchat');

var http = require('http');
var path = require('path');
var util = require('util');
var partials = require('express-partials');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // 页面模板位置
app.set('view engine', 'ejs'); // 模板引擎
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
// 试着将这两行代码放一起，放在session模块之后，这两个又放在其它模块之前
var flash = require('connect-flash');
app.use(flash());

// 用来代替原书中 dynamicHelpers 的代码
// 必须放在 app.use(app.router); 之前
// http://crazylpy.me/blog/nodejskai-fa-zhi-nan-wen-ti-jie-jue/
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    // res.locals.error = req.flash('error');
    // res.locals.success = req.flash('success');
    res.locals.error = '';
    res.locals.success = '';
    next();
});

app.use(app.router); // Notice
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* 路由 Begain */

// Notice 注意先后顺序
routes(app);
mongodb(app);

//app.use(express.router(routes)); // 这种已经不支持
//app.use(express.router(mongodb));
//app.use(express.router(webchat));

/*
app.get('/', routes.index); // 首页
app.get('/time', routes.time);

app.get('/users', user.list);
app.get('/mongodb', mongodb.list);
app.get('/webchat', webchat.list);

app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg); // user regiseter
app.post('/reg', routes.doReg); // user do register
app.get('/login', routes.login); // user login
app.post('/login', routes.doLogin); // user go logout
app.get('/logout', routes.logout); // user logout
*/
/* 路由 End */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
