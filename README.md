# 餐馆点餐 App vue

## 运行界面

![首页](https://i.loli.net/2019/07/07/5d21dcb8ec98213034.png)
![我的](https://i.loli.net/2019/07/07/5d21dcc8187b090045.png)
![订单](https://i.loli.net/2019/07/07/5d21ddfe3953132679.png)
![评价](https://i.loli.net/2019/07/07/5d21de109e60c60434.png)
![登录](https://i.loli.net/2019/07/07/5d21dde55a95667685.png)
![注册](https://i.loli.net/2019/07/07/5d21ddd7c135584780.png)
![城市选择](https://i.loli.net/2019/07/07/5d21dcdccdd8e17054.png)
![搜索](https://i.loli.net/2019/07/07/5d21dcfa7599180670.png)
![点菜](https://i.loli.net/2019/07/07/5d21dd3cac9b233136.png)
![弹层](https://i.loli.net/2019/07/07/5d21dd967e11592097.png)
![购物车]https://i.loli.net/2019/07/07/5d21dd864f1d082015.png)
![食物](https://i.loli.net/2019/07/07/5d21ddc04587a74086.png)
![商家评价](https://i.loli.net/2019/07/07/5d21dd1e48ba716486.png)
![商家](https://i.loli.net/2019/07/07/5d21dd0e5ad8351348.png)

## 介绍

> 简介：使用 vue 开发餐馆点餐 App

### 功能:
- 增: 点菜界面选择菜品增加到购物车里, 结算后购物车菜品添加到 mongodb. 订单界面能读取出这些购物车菜品
- 删: 订单界面删除购买到的菜品, 能删除 mongodb 里保存的数据
- 订单界面填写评论后能修改对应商家菜品的评论
- 查: 选择城市后, 能查询出 mongodb 里的城市数据
- 登录: 填写用户名和密码登录, 从数据库里面读取对应保存的用户名和邮箱
- 注册: 填写用户名, 密码, 邮箱后点击验证码, 发一封邮件到填写的邮箱, 输入验证码注册, mongodb 保存对应数据
- 登出: 用户界面用户名和邮箱清空

### 工具:
- vue 版本 "^2.6.10"
- Robo 3T 管理 MongoDB 数据库
- Postman 查询数据
- koa 为前端提供请求接口
- stylus 编写样式
- webpack 配置别名和代理
- element-ui 提供部分组件
- git 管理项目

### 插件:
- vue-awesome-swiper 用于首页图标横幅滚动效果
- fastclick 移动端点击 300MS 延迟
- vue-lazyload 用于小图标延迟加载
- element-ui 实现注册界面与登录界面的表单验证功能, 验证填写的用户名, 密码, 邮箱, 验证码, 这些信息作为参数传递到 koa2 后端
- vue-router 实现页面间路由跳转功能, 采取了路由懒加载
- notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示
- axios 向后端发起请求, 请求保存在 mongodb 里面的数据
- better-scroll 实现各个界面下拉滚动功能, 通过配置参数, 实现横向滚动卷轴功能, 返回顶部的功能
- crypto-js 注册界面输入的密码经过 MD5 加密传输到后端数据接口
- moment 用于评论界面的时间格式处理
- good-storage 实现 sessionStorage 和 localStorage 功能, 用于商家界面收藏页的存储功能
- vuex, state 共享时间格式数据, Mutation 修改 state 数据, 实现不同组件间"差评按钮"与"只看差评选项"的联动功能
- 配置 devServer proxy 代理, 指向后端启动的端口

### 样式:
- 粘连布局: 菜单弹出层粘连布局
- Flex 布局: 居中, 菜单弹出层布局设置
- 不同分辨率下的一像素线缩放情况
- 2X 3X 图实现
- reset.css 样式重置
- 清除浮动
- iconmoon 图标
- rem 设置 css 像素大小
- 文本超出显示 ...

后端：
- koa2 编写后端代码
- mongoose 用于连接 MongoDB, 创建 mongodb schema & model
- Robo 3T 管理 mongodb 数据库内容, postman 查看请求的数据
- koa-redis koa-generic-session 使用 redis session 数据库储存用户信息
- nodeMailer 实现发送电子邮件验证码
- koa-json koa-onerror koa-logger 实现 json 打印, koa 错误处理, koa 日志记录
- koa-passport passport-local 验证用户名对应的密码验证
- koa-bodyparser 针对请求报文的处理
