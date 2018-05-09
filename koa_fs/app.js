const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const fs = require('fs');

const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const route = require('koa-route');
const spider = require('./controller/spider.js')
const story = require('./controller/story.js')

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger()); 
// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const about =  (req,next) => {
  	let a = '1'
	const data = fs.readFileSync('data/data.json','utf-8')
	req.body = data
};


const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));

// 下载文件
//spider.download();

story.read(); 

app.listen(3000)

//module.exports = app;