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
          placeholder="亲，菜品的口味如何，商家的服务是否周到?"
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
      const commentTime = new Date()
      const text = this.textarea
      const recommend = this.orders[this.evaluateIndex]
      const username = this.user
      // console.log(this.orders, 'this.orders..')
      console.log(this.evaluateIndex, 'this.evaluateIndex..')
      console.log(username, score, rateType, moment(commentTime).format(this.dateType), text, recommend)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './evaluation.styl'
</style>
