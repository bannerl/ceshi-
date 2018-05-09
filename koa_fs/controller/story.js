const fs = require('fs');
const request = require("request-promise");
const cheerio = require("cheerio");
const mkdirp = require('mkdirp');

const config = require('../config');
exports.read = async function(ctx, next) {


    const dir = 'images';
    var urls = config.url;
    const body = await request(urls);
    var texts = [];
    var $ = cheerio.load(body);
    $('dt~dd').each(function(i,item) {
        var src = $(this).text();
        let info = {}
        info.name = $(this).text();
        info.index = i;
        texts.push(info);
    });
    console.log(texts)
    var str = JSON.stringify(texts)
    fs.writeFileSync('data/data.json', str);
}

async function downloadImg(url, dir, filename) {
    console.log('download begin---', url);
    request.get(url).pipe(fs.createWriteStream(dir + "/" + filename)).on('close', function() {
        console.log('download success', url);
    });
}
async function getResLink(index, url) {
    const body = await request(url);
    let urls = [];
    var $ = cheerio.load(body);
    $(config.rule).each(function() {
        var src = $(this).attr('src');
        urls.push(src);
    });
    return index + '___' + urls[0];
}
