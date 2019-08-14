<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-05 08:30:10
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 06:40:03
 -->
<template>
  <div class="evalutate">
    <div class="header">
      <router-link
        to="/order"
        class="arrow"
      >
        <i class="icon-arrow_lift" />
      </router-link>
      评价
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
          placeholder="请写下你的评价。4星或4星以上好评, 3星或3星以下差评"
          maxLength="50"
        />
        <span class="count">{{ maxCount }}</span>
      </div>
    </div>
    <el-row>
      <el-col>
        <el-button
          class="btn"
          type="warning"
          plain
          size="large"
          @click="submit"
        >
          提交评价
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Notyf } from 'notyf' // 提示插件
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import moment from 'moment' // 时间格式处理

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
      let rateType = 0 // 0 -> good comment, 1 -> bad comment
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
      const avatar = 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
      const commentTime = new Date()
      const time = moment(commentTime).format(this.dateType)
      const oldTime = (new Date(time)).getTime()
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
