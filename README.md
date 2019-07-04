# vue-sell-interview

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

> 简介：使用 react, 实现餐馆点餐 App

1. react 版本 "^16.8.6"
2. Robo 3T, Postman 管理 MongoDB 数据库, VSCode 编辑器编辑代码
3. 利用 MongoDB 数据库管理数据，
4. koa2 为前端提供请求接口
5. stylus 编写其样式，
6. webpack 配置别名和代理。
7. element-react 样式框架实现布局
8. git 管理项目

### 前端部分:
1. http-proxy-middleware 配置代理， 代理到后端接口上
2. react lazy & Suspense 实现代码拆分。lazy 懒加载组件, Suspense 维护子组件的 loading
3. react-router-dom, <BrowserRouter> 对 Router 的封装, <Switch> 将多个 <Route> 包裹在一起, <Route> 路由匹配, <Redirect> 页面重定向, <Link> 锚点连接, <NavLink> 自定义样式锚点连接, <withRouter> 函数返回一个组件。返回的组件外层是 Route
4. react-redux, <Provider> 为整个 App 传递 store, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, connect() 调用 mapStateToProps, mapDispatchToProps
5. redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据, 项目里请求的是 koa2 提供的接口
6. redux, 实现数据共享, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store
7. immutable 数据被修改时仍然能够保持修改前的状态, 省去拷贝操作, redux-immutable 提供的 combineReducers 实现 immutable, fromJS() redux 数据使其成为 immutable 数据, 组件中通过 getIn() & get() 获取 redux 的数据, reducer 里 toJS() 将 immutable 对象转原生 js, merge() 合并处理 immutable 的数据
8. nuka-carousel 实现图标轮播图功能
9. better-scroll 实现界面卷轴滚动功能
10. moment 评论界面的时间格式处理
11. axios 前端请求，后端配置了数据接口, 前端请求该接口
12. element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码的验证功能
13. crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
14. prop-types 对父组件传来的 props 进行检查
15. react-transition-group, CSSTransition 用于编写商家界面的动画
16. notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示

## 结构

1. 用户界面：显示用户信息与跳转注册和登录界面，
2. 注册登录界面: 请求后端数据库保存的用户名和密码来实现注册登录。
3. 首页界面：显示首页标题，内容分类与商家列表。商家列表能跳转到该商家主页
4. 商家主页: 具备点餐功能，查看评论，商家信息功能
