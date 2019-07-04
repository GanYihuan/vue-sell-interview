# 餐馆点餐 App vue

## 运行界面

![首页](https://i.loli.net/2019/07/04/5d1d4f015690842261.png)
![我的](https://i.loli.net/2019/07/04/5d1d4f141fb5d77037.png)
![登录](https://i.loli.net/2019/07/04/5d1d4e71ac17883368.png)
![注册](https://i.loli.net/2019/07/04/5d1d4f235b41891804.png)
![点菜](https://i.loli.net/2019/07/04/5d1d4e94a0aee27856.png)
![弹层](https://i.loli.net/2019/07/04/5d1d4e3cd2f7d33727.png)
![购物车](https://i.loli.net/2019/07/04/5d1d4eb13c15f42999.png)
![食物](https://i.loli.net/2019/07/04/5d1d4ef1a9ed494271.png)
![评价](https://i.loli.net/2019/07/04/5d1d4ec34a76c97586.png)
![商家](https://i.loli.net/2019/07/04/5d1d4ed3d288f28791.png)

## 介绍

> 简介：使用 vue 框架, 实现餐馆点餐 App

1. vue 版本 "^2.6.10"
2. Robo 3T, Postman 管理 MongoDB 数据库, VSCode 编辑器编辑代码
3. 利用 MongoDB 数据库管理数据，
4. koa2 为前端提供请求接口
5. stylus 编写其样式，
6. webpack 配置别名和代理。
7. element-ui 样式框架实现布局
8. git 管理项目

## 前端部分：
1. vue-awesome-swiper 用于首页图标横幅滚动效果
2. fastclick 移动端点击 300MS 延迟
3. vue-lazyload 用于小图标延迟加载
4. element-ui 实现注册界面与登录界面的表单验证功能, 验证填写的用户名, 密码, 邮箱, 验证码, 这些信息作为参数传递到 koa2 后端
5. vue-router 实现页面间路由跳转功能, 采取了路由懒加载
6. notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示
7. axios 向后端发起请求, 请求保存在 mongodb 里面的数据
8. better-scroll 实现各个界面下拉滚动功能, 通过配置参数, 实现横向滚动卷轴功能, 返回顶部的功能
9. crypto-js 注册界面输入的密码经过 MD5 加密传输到后端数据接口
10. moment 用于评论界面的时间格式处理
11. good-storage 实现 sessionStorage 和 localStorage 功能, 用于商家界面收藏页的存储功能
12. vuex, state 共享时间格式数据, Mutation 修改 state 数据, 实现不同组件间"差评按钮"与"只看差评选项"的联动功能
13. 配置 devServer proxy 代理, 指向后端启动的端口

## 后端部分：
1. koa2 编写后端代码
2. mongoose 用于连接 MongoDB, 创建 mongodb schema & model
3. Robo 3T 管理 mongodb 数据库内容, postman 查看请求的数据
4. koa-redis koa-generic-session 使用 redis session 数据库储存用户信息
5. nodeMailer 实现发送电子邮件验证码
6. koa-json koa-onerror koa-logger 实现 json 打印, koa 错误处理, koa 日志记录
7. koa-passport passport-local 验证用户名对应的密码验证
8. koa-bodyparser 针对请求报文的处理

## 结构

1. 用户界面：显示用户信息与跳转注册和登录界面，
2. 注册登录界面: 请求后端数据库保存的用户名和密码来实现注册登录。
3. 首页界面：显示首页标题，内容分类与商家列表。商家列表能跳转到该商家主页
4. 商家主页: 具备点餐功能，查看评论，商家信息功能
