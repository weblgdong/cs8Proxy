var http = require('http');
var https = require('https');
const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');

app.use(cors());

app.use(async (ctx) => {
  // let url = ctx.url
  let request = ctx.request
  let req_query = request.query
  ctx.body = await imgtoBase64(req_query.url);
})

app.listen(4001)

async function imgtoBase64(url) {
  var url = url // || 'http://www.csby8.com:8000/images/csw/32A5AF7AB3E44824A902092873B5893F.jpg';
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('');
    } else {
      http.get(url, function (res) {　　
        var chunks = [];
        var size = 0;
        res.on('data', function (chunk) {　　　　
          chunks.push(chunk);　
          size += chunk.length;
        });
        res.on('end', function (err) {
          var data = Buffer.concat(chunks, size);　
          var base64Img = data.toString('base64');
          resolve('data:image/jpeg;base64,' + base64Img);
        });
      });
    }
  })
}