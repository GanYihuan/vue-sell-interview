const Router = require('koa-router')
const Home = require('../dbs/models/homes')

const router = new Router({ // Routing prefix
  prefix: '/homes'
})

// [home icon](http://localhost:3000/homes/getHome)
router.get('/getHome', async ctx => {
  const result = await Home.find()
  ctx.body = {
    homes: result.map(item => {
      return {
        code: item.code,
        name: item.name,
        url: item.url,
        gray_url: item.gray_url,
        gray_switch: item.gray_switch,
        skip_protocol: item.skip_protocol,
        sequence: item.sequence,
        brand_type: item.brand_type,
        first_tag_codes: item.first_tag_codes,
        second_tag_codes: item.second_tag_codes,
        method: item.method,
        bubble: item.bubble
      }
    })
  }
})

module.exports = router
