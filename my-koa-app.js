const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const formidable = require("koa2-formidable");
const multer = require("koa-multer");
const cors = require("koa2-cors");
const db = require("./db.js");

const app = new Koa();
const upload = multer({ dest: "uploads/" });
const router = Router();
app.use(bodyParser());
// app.use(formidable());
app.use(
  cors({
    origin: function(ctx) {
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

const port = process.env.PORT || 3000;

router.get("/", async function(ctx) {
  ctx.body = "welcome to home";
});
router.post("/", async (ctx, next) => {
  ctx.body = "adad";
});

router.get("/:name", async (ctx, next) => {
  // 檢查 Token，若有問題回傳 400 HTTP StatusCode
  ctx.body = `Hi, ${ctx.params.name}`;
  console.log(ctx.params);
  console.log(ctx.query);
  if (ctx.query.id == "123") ctx.throw(400);
  // 若已經拋出 400 的狀態，接下來的程式不會被執行
  // ctx.body = "123";
});

router.post("/132", async (ctx, next) => {
  let name = ctx.request.body.name;
  // response.status = 201;
  // ctx.respond = name;
});

router.post("/api/image", async (ctx, next) => {
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

const queryUserByCity = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT content FROM quill WHERE ID = ${id}`,
      (err, rows, fields) => {
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

router.get("/api/quill", async (ctx, next, queryUserByCity) => {
  let ID = ctx.query.ID;
  const res = await db.queryUserByCity(ID).then(results => {
    console.log(results[0]);
    return results[0];
  });
  ctx.body = res;
});

router.post("/api/quill", async (ctx, next) => {
  console.log(ctx.request.body.content);

  var sql = `INSERT INTO quill (content) VALUES ('${
    ctx.request.body.content
  }')`;
  connection.query(sql, function(error, results, fields) {
    if (error) throw error;
    console.log("succ");
    res = results;
  });
  ctx.body = ctx.request.body.content;
});

app.use(router.routes());

app.listen(port, () => console.log(`Listening on ${port}`));
