require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose   = require('mongoose');
const session = require('koa-session');

const api = require('./api');

const app = new Koa();
const router = new Router();

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

const sessionConfig = {
  maxAge: 86400000, //하루
  // signed: true //기본값
}

app.use(session(sessionConfig, app));
app.key = [signKey];

// DB setting
// mongoose.connect(process.env.MONGO_DB); // 1
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
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

app.listen(port, () => {
  console.log('listening to port 4000');
});
