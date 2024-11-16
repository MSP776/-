const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha') // 验证码
const { getTopMovielist, getHotMovielist, getHopeMovielist, getCinemaList, getScheduleList, addlist, updateSeat, login, register, getOrderlist } = require('../src/controller/blog')
const cors = require('koa2-cors');
router.use(cors(
  {
    origin: "*", // 允许来自指定域名请求
    maxAge: 5, // 本次预检请求的有效期，单位为秒。
    methods: ['GET', 'POST'],  // 所允许的HTTP请求方法
    alloweHeaders: ['Conten-Type'], // 服务器支持的所有头信息字段
    credentials: true // 是否允许发送Cookie
  }
));

router.prefix('/api')

router.get('/top', async (ctx, next) => {
  const topMovieList = await getTopMovielist();
  ctx.body = {
    MovieList: topMovieList
  }
})

router.get('/hot', async (ctx, next) => {
  const hotMovieList = await getHotMovielist();
  ctx.body = {
    MovieList: hotMovieList
  }
})

router.get('/hope', async (ctx, next) => {
  const hopeMovieList = await getHopeMovielist();
  ctx.body = {
    MovieList: hopeMovieList
  }
})

router.get('/cinemalist', async (ctx, next) => {
  const CinemaList = await getCinemaList();
  ctx.body = {
    CinemaList: CinemaList
  }
})

router.get('/schedulelist', async (ctx, next) => {
  const schedulelist = await getScheduleList();
  ctx.body = {
    schedulelist: schedulelist
  }
})

router.post(
  '/add',
  async (ctx, next) => {
    let blog = ctx.request.body;
    console.log(blog);
    const result = await addlist(blog);
    if (result) {
      ctx.body = {
        status: 200,
        message: "成功添加",
        result
      };
    } else {
      ctx.body = {
        status: 404,
        result: "添加失败"
      };
    }
  },
  cors({ credentials: true })
);

router.post("/updateseat",
  async (ctx, next) => {
    let blog = ctx.request.body
    const result = await updateSeat(blog);
    if (result) {
      ctx.body = {
        status: 200,
        message: "成功插入",
        result
      }
    }
    else {
      ctx.body = {
        status: 404,
        result: "插入失败"
      }
    }

  })

router.post("/login", async (ctx, next) => {
  let blog = ctx.request.body
  let username = blog.username
  let password = blog.password
  if (!username || !password) {
    ctx.body = {
      status: 400,
      result: "用户名和密码不能为空"
    }
  }
  else {
    const result = await login(blog);
    if (result.length > 0) {
      // 登陆成功  生成token
      // 设置密钥
      const secretKey = 'msp'; // 这里设置为自己想要的密钥
      // 设置有效期（单位：分钟）
      const expiresInMinutes = 60; // 默认值为1小时
      // 创建payload对象，包含所需的信息
      const payload = { id: username }; // 这里可以将id值设为真正的用户ID或其他相关信息
      // 生成Token
      const token = jwt.sign(payload, secretKey, { expiresIn: `${expiresInMinutes}m` });
      // console.log(`Generated Token: ${token}`);
      // console.log(result[0].userid)
      ctx.body = {
        status: 200,
        message: "登陆成功",
        token: token,
        userid: result[0].userid
      }
    }
    else {
      ctx.body = {
        status: 404,
        message: "登陆失败"
      }
    }
  }
})

router.post("/register", async (ctx, next) => {
  let blog = ctx.request.body
  let username = blog.username
  let password = blog.password
  if (username.length < 4 || password.length < 4) {
    ctx.body = {
      status: 400,
      result: "用户名和密码长度至少为4位"
    }
  }
  else {
    const result = await register(blog);
    if (result == 0) {
      ctx.body = {
        status: 304,
        result: "用户名已存在"
      }
    }
    else {
      if (result) {
        ctx.body = {
          status: 200,
          message: "注册成功",
        }
      }
      else {
        ctx.body = {
          status: 404,
          message: "注册失败",
        }
      }
    }
  }
})

router.get("/captcha", async (ctx, next) => {
  const img = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    color: true, // 验证码是否有彩色
    noise: 1, //干扰线
    background: '#666' // 背景颜色
  })
  console.log(img.text);

  ctx.body = {
    image: img
  }
})

router.get('/order', async (ctx, next) => {
  let userid = ctx.query.userid
  console.log(userid)
  const orderList = await getOrderlist(userid);
  ctx.body = {
    status: 200,
    orderList: orderList
  }


})

module.exports = router
