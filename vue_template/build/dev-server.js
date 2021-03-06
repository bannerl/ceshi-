'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var user = appData.user;
var users = appData.users;
var ratings = appData.ratings;
var address = appData.user.address;
var index = appData.index;
var shops = appData.shops;
var category = appData.category;
var apiRoutes = express.Router();

apiRoutes.get('/seller',function (req,res){
	 	res.json({
	 			status:0,
	 			data: seller
	 });
});

apiRoutes.get('/goods',function(req,res){
		res.json({
			status:0,
			data:goods
		});
});

apiRoutes.get('/ratings',function(req,res){
		res.json({
			status:0,
			data:ratings
		});
});

apiRoutes.get('/user',function(req,res){
		res.json({
			status:0,
			data:user
		});
});

apiRoutes.get('/shops',function(req,res){
	
	let data = []
	for(var i=0;i<shops.length;i++) {
			
		if((shops[i].maxType-0) === (req.query.max_type-0)) {
			data = shops[i]
			
		}
	}
		res.json({
			status:0,
			data:data
		});
});

apiRoutes.get('/category',function(req,res){
		res.json({
			status:0,
			data:category
		});
});

apiRoutes.get('/users',function(req,res){
		res.json({
			status:0,
			data:users
		});
});

apiRoutes.get('/users/address',function(req,res){
		res.json({
			status:0,
			data:address
		});
});

apiRoutes.get('/index',function(req,res){
		res.json({
			status:0,
			data:index
		});
});

app.use('/api',apiRoutes);

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
