const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose   = require("mongoose");

const api = require('./api');

const app = new Koa();
const router = new Router();

// DB setting
// mongoose.connect(process.env.MONGO_DB); // 1
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://my_mean:dlskdud1@ds121321.mlab.com:21321/my_mean").then(() => {
  console.log("DB connected");
}).catch((e) => {
  console.error(e);
});

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyparser 적용
app.use(bodyParser());

// app인스턴스에 라우터적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('listening to port 4000');
});
