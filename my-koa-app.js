const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const formidable = require("koa2-formidable");
const app = new Koa();
const router = Router();
app.use(bodyParser());
app.use(formidable());

// 設定根路徑的處理函數
router.get("/", async function(ctx) {
  let a = ctx.query.name;
  let b = ctx.query.msg;
  ctx.body = { payload: a + b + "hello world"};
//   ctx.status = 501;
});

router.post("/132", async function(ctx) {
  let name = ctx.request.body.name;
  response.status = 201;
  ctx.respond = name;
});

router.get("/test", async function(ctx) {
  // 檢查 Token，若有問題回傳 400 HTTP StatusCode
  ctx.body = "123123";
  if (ctx.query.token == "123") ctx.throw(400);

  // 若已經拋出 400 的狀態，接下來的程式不會被執行
  ctx.body = "Hello World";
});

app.use(router.routes());

app.listen(3000);