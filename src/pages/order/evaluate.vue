<template>
  <div class="evalutate">
    <div class="header">
      <router-link
        to="/order"
      >
        <i class="icon-arrow_lift" />
        订单
      </router-link>
    </div>
    <div class="eva-content">
      <div class="star-area">
        <div
          v-for="item in stars"
          :key="item.num"
          class="star-item"
          :class="{'highlight': item.num <= startIndex}"
          @click="addStar(item.num)"
        />
      </div>
      <div class="comment">
        <textarea
          v-model="textarea"
          class="comment-input"
          placeholder="菜品的口味如何? 请写下你的评价。 4星以上好评, 3星以下差评"
          maxLength="50"
        />
        <span class="count">{{ maxCount }}</span>
      </div>
    </div>
    <div
      class="submit"
      @click="submit"
    >
      提交评价
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import { Notyf } from 'notyf' // 纯js消息通知插件
import moment from 'moment' // 时间格式处理
import { mapState } from 'vuex'

export default {
  name: 'Evaluate',
  data() {
    return {
      startIndex: 0,
      stars: [
        {
          num: 0
        },
        {
          num: 1
        },
        {
          num: 2
        },
        {
          num: 3
        },
        {
          num: 4
        }
      ],
      maxCount: 50,
      user: '默认用户名',
      email: '',
      textarea: ''
    }
  },
  computed: {
    ...mapState({
      dateType: state => state.dateType,
      evaluateIndex: state => state.evaluateIndex
    })
  },
  mounted() {
    this.getUser()
    this.getOrder()
  },
  methods: {
    async getUser() {
      const { status, data: { user }} = await axios.get('/users/getUser')
      if (status === 200) {
        this.user = user
      }
    },
    async getOrder() {
      const { status, data: { orders }} = await axios.get('/orders/getOrder')
      if (status === 200) {
        this.orders = orders
      }
    },
    addStar(index) {
      this.startIndex = index
    },
    submit() {
      const score = this.startIndex + 1
      let rateType = 0
      if (score >= 4) {
        rateType = 0
      } else {
        rateType = 1
      }
      const text = this.textarea
      const selectFoods = this.orders[this.evaluateIndex].menu
      const recommend = []
      for (const i of selectFoods) {
        recommend.push(i.name)
      }
      const username = this.user
      const avatar = './img/avatar.png'
      const commentTime = new Date()
      const time = moment(commentTime).format(this.dateType)
      const oldTime = (new Date(time)).getTime()
      // console.log(username, score, rateType, oldTime, text, recommend, avatar)
      axios
        .post('/ratings/addRating', {
          username: username,
          rateTime: oldTime,
          score: score,
          rateType: rateType,
          text: text,
          avatar: avatar,
          recommend: recommend
        })
        .then(({ status, data }) => {
          const notyf = new Notyf()
          if (status === 200) {
            if (data && data.code === 0) {
              notyf.success(`${data.msg} 评价成功!`)
            } else {
              notyf.error(`${data.msg} 评价失败`)
            }
          } else {
            notyf.error(`服务器出错，错误码:${status}`)
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './evaluation.styl'
</style>
