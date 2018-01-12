var Koa = require('koa');
var app = new Koa();
var Router = require('koa-router');
var router =  Router();

app.use(router['routes']());

router.get('/',function (ctx,next){
	ctx.body = "index";
});

router.get('/api/1',function (ctx,next){
	ctx.body = "11";
});

app.use(router.routes())
   .use(router.allowedMethods());
   
app.listen(3000);
