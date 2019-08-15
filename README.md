<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 02:19:56
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 18:19:01
 -->

# 餐馆点餐 App vue

## 构建 mongodb 数据

- 创建 `sell` 数据库
![Robo 3T](https://i.loli.net/2019/08/15/6xL9MRak8FOo7Tz.png)

- 进入 dbs 目录
(`cseller` dbname, Robo 3T `csellers` collection name)

- 打开一个终端

```node
mongoimport -d sell -c cmerchants cmerchant.dat
mongoimport -d sell -c csellers cseller.dat
mongoimport -d sell -c goods good.dat
mongoimport -d sell -c homes homes.dat
mongoimport -d sell -c locations location.dat
mongoimport -d sell -c ratings ratings.dat
```

## 运行

安装 mongo & redis

```node
brew install redis
brew install mongodb
```

- 打开一个终端

```node
sudo mongod
```

- 再打开一个终端

```node
mongo
```

- 再打开一个终端

```node
redis-server
```

- 再打开一个终端

> cd server 目录或者 [下载 server 项目](https://github.com/GanYihuan/vue-sell-interview-koa)

```node
npm install
npm run start
```

- 再打开一个终端

> cd vue-sell-interivew

```node
npm install
npm run server
```

## server

**特别说明: dbs/config.js 里面的邮箱要修改成自己的 qq 邮箱, SMTP 要开启腾讯设置查询到属于自己的号码。注册功能需要用到!**

> server 安装

```node
npm i koa-generator -g
koa2 -e vue-sell-interview-koa
npm install
npm run start
```

> 下载工具

- 下载 Robo 3T 用来管理 mongodb 数据库
- 下载 postman 用来查看请求的数据

> postman 请求接口

```node
http://localhost:3000/cmerchants/getMerchant
http://localhost:3000/csellers/getSeller
http://localhost:3000/goods/getGood
http://localhost:3000/homes/getHome
http://localhost:3000/locations/getCity
http://localhost:3000/orders/getOrder
http://localhost:3000/ratings/getRating
http://localhost:3000/users/getUser
```

> koa 插件

- koa

```node
const Koa = require('koa') // koa
```

- koa-views

```node
const views = require('koa-views') // 用于 koa@2 的模板呈现中间件
```

- koa-json

```node
const json = require('koa-json') // JSON 漂亮打印响应中间件
```

- koa-onerror

```node
const onerror = require('koa-onerror') // 一个用于 koa 的错误处理程序
```

- koa-bodyparser

```node
const bodyparser = require('koa-bodyparser') // 针对请求报文的处理 一个基于co-body的koa体解析器。支持json，表单和文本类型的主体。
```

- koa-logger

```node
const logger = require('koa-logger') // 用于koa的开发风格日志记录器中间件。
```

- koa-generic-session

```node
const session = require('koa-generic-session') // Koa通用的session中间件
```

- mongoose

```node
const mongoose = require('mongoose')
```

- koa-redis

```node
const Redis = require('koa-redis') // Redis存储用于Koa会话中间件/缓存，支持前哨和集群
```

- axios

```node
const axios = require('axios') // Promise based HTTP client for the browser and node.js
```

- koa-passport

```node
const passport = require('koa-passport') // 用于Koa的Passport中间件
```

- passport-local

```node
const LocalStrategy = require('passport-local') // 使用用户名和密码进行身份验证的Passport策略。
```

- koa-router

```node
const Router = require('koa-router') // koa 路由
```

- nodemail

```node
const nodeMailer = require('nodemailer') // 从Node.js发送电子邮件
```

## 功能

- 增: 点菜界面选择菜品增加到购物车里, 结算后购物车菜品添加到 mongodb. 订单界面能读取出这些购物车菜品
- 删: 订单界面删除购买到的菜品, 能删除 mongodb 里保存的数据
- 改: 订单界面填写评论后能修改对应商家菜品的评论
- 查: 选择城市后, 能查询出 mongodb 里的城市数据
- 登录: 填写用户名和密码登录, 从数据库里面读取对应保存的用户名和邮箱
- 注册: 填写用户名, 密码, 邮箱后点击验证码, 发一封邮件到填写的邮箱, 输入验证码注册, mongodb 保存对应数据
- 登出: 用户界面用户名和邮箱清空

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
![购物车](https://i.loli.net/2019/07/07/5d21dd864f1d082015.png)
![食物](https://i.loli.net/2019/07/07/5d21ddc04587a74086.png)
![商家评价](https://i.loli.net/2019/07/07/5d21dd1e48ba716486.png)
![商家](https://i.loli.net/2019/07/07/5d21dd0e5ad8351348.png)