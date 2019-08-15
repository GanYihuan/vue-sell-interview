const Router = require('koa-router')
const Rating = require('../dbs/models/ratings')

const router = new Router({ // Routing prefix
  prefix: '/ratings'
})

// http://localhost:3000/ratings/getRating
router.get('/getRating', async ctx => {
  const result = await Rating.find()
  ctx.body = {
    ratings: result.map(item => {
      return {
        username: item.username,
        rateTime: item.rateTime,
        deliveryTime: item.deliveryTime,
        score: item.score,
        rateType: item.rateType,
        text: item.text,
        avatar: item.avatar,
        recommend: item.recommend
      }
    })
  }
})

router.post('/addRating', async ctx => {
  const {
    username,
    rateTime,
    deliveryTime,
    score,
    rateType,
    text,
    avatar,
    recommend
  } = ctx.request.body // get user upload data (register.vue pass parameter)
  const order = await Rating.create({ // write into database
    username,
    rateTime,
    deliveryTime,
    score,
    rateType,
    text,
    avatar,
    recommend
  })
  if (order) { // add comment success
    ctx.body = {
      code: 0,
      msg: '评价成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '评价失败'
    }
  }
})

module.exports = router
