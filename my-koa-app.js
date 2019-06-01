const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
var path = require("path");
const bodyParser = require("koa-bodyparser");
const formidable = require("koa2-formidable");
const multer = require("koa-multer");

const app = new Koa();
const upload = multer({ dest: "uploads/" });
const router = Router();
app.use(bodyParser());
app.use(formidable());
const port = process.env.PORT || 3000;

// 設定根路徑的處理函數
router.get("/", async function(ctx) {
  ctx.body = "hello world123";
});

router.get("/:name", async function(ctx) {
  // 檢查 Token，若有問題回傳 400 HTTP StatusCode
  ctx.body = `Hi, ${ctx.params.name}`;
  console.log(ctx.params);
  console.log(ctx.query);
  if (ctx.query.id == "123") ctx.throw(400);
  // 若已經拋出 400 的狀態，接下來的程式不會被執行
  // ctx.body = "123";
});

router.post("/132", async function(ctx) {
  let name = ctx.request.body.name;
  response.status = 201;
  ctx.respond = name;
});

router.post("/api/image", async function(ctx) {
  let { body, files } = ctx.request;
  // console.log(body);
  // console.log(files);
  console.log(files.avatar);
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  // console.log(files.path);

  const reader = fs.createReadStream(files.avatar.path);
  console.log(reader);
  let filePath = path.join(__dirname, "uploads/") + `/${files.avatar.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return (ctx.body = "上傳成功！");
});

app.use(router.routes());

app.listen(port, () => console.log(`Listening on ${port}`));
