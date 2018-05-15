const Koa = require('koa')
const app = new Koa()
var request = require('request');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

app.use(cors());
app.use(async (ctx) => {
  let url = ctx.url
  let request = ctx.request
  let ctx_method = ctx.method
  let params = {};
  if (ctx_method === "POST") {
    params = ctx.request.body;
  }
  ctx.body = await proxyCS8('getHallImgByRandomNo.htm?randomNo=99', ctx_method);
})

app.listen(3456)


async function proxyCS8(url, method = "GET", params = {}) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.csby8.com/${url}`,
      method: method,
      oauth: params
    }, function (err, response, body) {
      resolve(body);
    })
  })
}