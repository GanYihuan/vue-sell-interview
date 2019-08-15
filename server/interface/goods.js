const Router = require('koa-router')
const Good = require('../dbs/models/goods')

const router = new Router({ // Routing prefix
  prefix: '/goods'
})

// http://localhost:3000/goods/getGood
router.get('/getGood', async ctx => {
  const result = await Good.find()
  ctx.body = {
    goods: result.map(item => {
      return {
        type: item.type,
        name: item.name,
        foods: item.foods
      }
    })
  }
})

module.exports = router
