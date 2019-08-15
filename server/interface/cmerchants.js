const Router = require('koa-router')
const CMerchant = require('../dbs/models/cmerchants')

const router = new Router({ // Routing prefix
  prefix: '/cmerchants'
})

// http://localhost:3000/cmerchants/getMerchant
router.get('/getMerchant', async ctx => {
  const result = await CMerchant.find()
  ctx.body = {
    merchants: result.map(item => {
      return {
        city: item.city,
        id: item.id,
        pic_url: item.pic_url,
        name: item.name,
        wm_poi_score: item.wm_poi_score,
        month_sale_num: item.month_sale_num,
        distance: item.distance,
        mt_delivery_time: item.mt_delivery_time,
        min_price_tip: item.min_price_tip,
        delivery_type: item.delivery_type
      }
    })
  }
})

module.exports = router
