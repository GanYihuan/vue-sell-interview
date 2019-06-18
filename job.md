简介：使用 vue, 实现一个餐馆点餐 App。采用 koa2 编写后端数据, 使用 MongoDB 用来储存用户数据, 商家内容采取 axios 方式请求静态数据。stylus 编写样式

结构：
用户界面：具体显示用户信息与跳转注册和登录界面，
注册登录界面请求后端数据库保存的用户名和密码来实现注册登录。
首页界面：显示首页标题，内容分类与商家列表。
商家列表能跳转到该商家主页，具备点餐功能，查看评论，商家信息功能


前端部分：
1. fastclick 移动端点击延迟300MS
2. vue-lazyload 图片延迟加载插件，实现标志图片的加载
3. element-ui 实现表单验证，验证注册界面填写的密码，邮箱，验证码的信息格式
4. vue-router 路由跳转，实现不同页面间跳转功能
5. reset.css 全局重置样式，使用通用配置的样式设置
6. axios 前端请求, axios.all 实现多个请求发起，配置了用户名即对应密码信息的后端数据接口
7. better-scroll 实现滚动功能，配置横向滚动与纵向滚动功能
8. crypto-js 注册时输入密码需要加密传输到后端数据接口里
9. good-storage 存储库，实现sessionStorage和localStorage功能，用于商家界面收藏页的存储功能
10. moment 时间格式处理，评论界面的时间格式处理
11. vue-awesome-swiper 轮播图实现，首页的轮播图实现滚动的图标效果
12. vuex state 实现共享时间格式数据, ...mapMutations 通过修改 state 的数据实现不同组件间"差评按钮"与"只看差评选项"的联动功能
13. 异步组件处理路由组件加载状态, 提高性能和首屏加载速度

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
