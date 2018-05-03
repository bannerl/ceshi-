const http = require('http')
const fs = require('fs')
const koa = require('koa')
const app = new koa()
 
app.use(async function (ctx, next) {
    ctx.res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    await next() // 执行下一个app.use，当下一个app.use执行完过后，在接着执行下面的语句<br>　　 console.log('4')
})
app.use(async function (ctx, next) {
    let files = []
    let newfiles = []
    await new Promise((resolve, reject) => { // 读image文件夹
        fs.readdir (__dirname + '/images', function(err, picFiles) {
            if(err) ctx.throw(err)
            files = picFiles // 将所有的文件夹名字放到外面来。
            console.log('1')
            resolve()  // resolve过后，await语句才结束
        })
    })
    const stats = function (fileName) {
        return new Promise((resolve, reject) => {
            fs.stat(__dirname + '/images/' + fileName, function (err, file) { // 查看是否是文件夹
                if(file.isDirectory()) newfiles.push(fileName)
                	newfiles.push(fileName)
                console.log('2')
                resolve()
            })
        })
    }
    let promises = files.map(file => stats(file)) // *这儿使用map() 它返回的值组成新的数组promises,每个元素都是stats()函数返回的promise对象。
    await Promise.all(promises) // 当所有promise都resolve()后 执行下一步
    console.log(3)
    ctx.body = newfiles // 这个必须放在外面，不能放在promise.all().then（）中
})
 
app.listen(3000)