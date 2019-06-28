简介：使用 vue, 实现一个餐馆点餐 App。采用 koa2 编写后端数据, 使用 MongoDB 用来储存用户数据, 商家内容采取 axios 方式请求静态数据。stylus 编写样式

前端部分：
vue-awesome-swiper 用于首页图标横幅滚动效果
fastclick 移动端点击 300MS 延迟
vue-lazyload 用于小图标延迟加载
element-ui 实现注册界面与登录界面的表单验证功能, 验证填写的用户名, 密码, 邮箱, 验证码, 这些信息作为参数传递到 koa2 后端
vue-router 实现页面间路由跳转功能, 采取了异步组件方式
reset.css 全局重置样式，使用通用配置的样式设置
notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示
axios 向后端发起请求, 请求保存在 mongodb 里面的数据
better-scroll 实现各个界面下拉滚动功能, 通过配置参数, 实现横向滚动卷轴功能, 返回顶部的功能
crypto-js 注册界面输入的密码经过 MD5 加密传输到后端数据接口
moment 用于评论界面的时间格式处理
good-storage 实现 sessionStorage 和 localStorage 功能, 用于商家界面收藏页的存储功能
vuex, state 共享时间格式这条数据, ...mapMutations 修改 state 里的数据, 实现不同组件间"差评按钮"与"只看差评选项"的联动功能

后端部分：
主要接口：登录接口 /signin, 注册接口 /signup, 验证接口 /verify, 退出接口 /exit, 获取用户信息接口 /getUser
1. koa 使用 koa2 编写后端数据
2. mongoose 使用 MongoDB 存储数据
3. consola 优雅的控制台日志
4. koa-bodyparser 针对请求报文的处理
5. koa-generic-session Koa通用的session中间件
6. koa-redis Redis 用于koa会话中间件/缓存的Redis存储
7. koa-json JSON漂亮打印响应中间件
8. koa-passport 用于Koa的Passport中间件，登录时通过验证用户名和密码返回对应状态，实现不同情况的登录状态数据
9. passport-local 当点击登录按钮时，用于验证用户名对应的密码验证，看看是否符合数据库保存的信息
10. koa-router koa 的路由库
11. koa-redis koa会话中间件/缓存的Redis存储
12. nodemailer 从Node.js发送电子邮件，MongoDB 用来储存用户数据。商家数据采取静态数据方式请求。
