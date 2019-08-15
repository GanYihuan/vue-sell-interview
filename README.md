<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 02:19:56
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 17:43:33
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

> cd server 目录

```node
npm install
npm run start
```

- 再打开一个终端

> cd vue-sell-interivew

```node
npm run server
```

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

### 功能

- 增: 点菜界面选择菜品增加到购物车里, 结算后购物车菜品添加到 mongodb. 订单界面能读取出这些购物车菜品
- 删: 订单界面删除购买到的菜品, 能删除 mongodb 里保存的数据
- 订单界面填写评论后能修改对应商家菜品的评论
- 查: 选择城市后, 能查询出 mongodb 里的城市数据
- 登录: 填写用户名和密码登录, 从数据库里面读取对应保存的用户名和邮箱
- 注册: 填写用户名, 密码, 邮箱后点击验证码, 发一封邮件到填写的邮箱, 输入验证码注册, mongodb 保存对应数据
- 登出: 用户界面用户名和邮箱清空

### 工具

- vue 版本 "^2.6.10"
- koa 为前端提供请求接口
- stylus 编写样式
