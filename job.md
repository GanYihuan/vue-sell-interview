简介：
使用 vue 框架, 实现餐馆点餐 App
koa 编写后端, MongoDB 储存界面数据, stylus 编写样式, git 管理该项目

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
vuex, state 共享时间格式数据, Mutation 修改 state 数据, 实现不同组件间"差评按钮"与"只看差评选项"的联动功能
配置 devServer proxy 代理, 指向后端启动的端口

后端部分：
koa
mongoose 用于连接 MongoDB, 创建 mongodb schema & model
Robo 3T 管理 mongodb 数据库内容, postman 查看请求的数据
koa-redis koa-generic-session 使用 redis session 数据库储存用户信息
nodeMailer 实现发送电子邮件验证码
koa-json koa-onerror koa-logger 实现 json 打印, koa 错误处理, koa 日志记录
koa-passport passport-local 验证用户名对应的密码验证
koa-bodyparser 针对请求报文的处理
