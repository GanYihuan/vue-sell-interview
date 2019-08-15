const Router = require('koa-router')
const CSeller = require('../dbs/models/csellers')

const router = new Router({ // Routing prefix
  prefix: '/csellers'
})

// http://localhost:3000/csellers/getSeller
router.get('/getSeller', async ctx => {
  const result = await CSeller.find()
  ctx.body = {
    sellers: result.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        score: item.score,
        serviceScore: item.serviceScore,
        foodScore: item.foodScore,
        rankRate: item.rankRate,
        ratingCount: item.ratingCount,
        minPrice: item.minPrice,
        deliveryPrice: item.deliveryPrice,
        deliveryTime: item.deliveryTime,
        bulletin: item.bulletin,
        supports: item.supports,
        infos: item.infos,
        pics: item.pics,
        avatar: item.avatar,
        sellCount: item.sellCount
      }
    })
  }
})

module.exports = router
