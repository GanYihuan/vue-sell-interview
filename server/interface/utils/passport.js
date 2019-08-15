const passport = require('koa-passport') // 用于Koa的Passport中间件
const LocalStrategy = require('passport-local') // 使用用户名和密码进行身份验证的Passport策略。
const UserModel = require('../../dbs/models/users')

passport.use( // [Configure Strategy](https://www.npmjs.com/package/passport-local)
  new LocalStrategy(async function(username, password, done) {
    const where = { username }
    const result = await UserModel.findOne(where)
    if (result !== null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)

passport.serializeUser(function(user, done) { // User information is retained in session, defulat
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  return done(null, user)
})

module.exports = passport
