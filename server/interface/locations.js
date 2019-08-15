const Router = require('koa-router')
const Location = require('../dbs/models/locations')

const router = new Router({ // Routing prefix
  prefix: '/locations'
})

// http://localhost:3000/locations/getCity
router.get('/getCity', async ctx => {
  const result = await Location.findOne()
  ctx.body = {
    citys: {
      hotCities: result.hotCities,
      cities: result.cities
    }
  }
})

module.exports = router
