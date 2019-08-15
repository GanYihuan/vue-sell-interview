const Router = require('koa-router')
const Order = require('../dbs/models/orders')

const router = new Router({ // Routing prefix
  prefix: '/orders'
})

// http://localhost:3000/orders/pay
router.post('/pay', async ctx => {
  const {
    sellerName,
    sellerImage,
    menu,
    number,
    price
  } = ctx.request.body // get user upload data (register.vue pass parameter)
  const order = await Order.create({ // write into database
    sellerName,
    sellerImage,
    menu,
    number,
    price
  })
  if (order) { // add comment success
    ctx.body = {
      code: 0,
      msg: '支付成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '支付失败'
    }
  }
})

// [订单](http://localhost:3000/orders/getOrder)
router.get('/getOrder', async ctx => {
  const result = await Order.find()
  ctx.body = {
    orders: result.map(item => {
      return {
        menu: item.menu,
        sellerName: item.sellerName,
        sellerImage: item.sellerImage,
        number: item.number,
        price: item.price
      }
    })
  }
})

// http://localhost:3000/orders/deleteOrder
router.post('/deleteOrder', async function(ctx) {
  const {
    sellerName,
    number,
    price
  } = ctx.request.body
  const result = await Order.find({
    sellerName: sellerName
  }).where('number').equals(number).where('price').equals(price).remove()
  ctx.body = {
    code: 0,
    result
  }
})

module.exports = router
