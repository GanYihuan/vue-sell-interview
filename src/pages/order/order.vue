<template>
  <div class="orderPage">
    <div class="header">
      订单
    </div>
    <div
      ref="order"
      class="order"
    >
      <div class="order-list">
        <div
          v-for="(item, index) in orders"
          :key="index"
          class="order-item"
        >
          <div class="order-item-inner">
            <img
              class="item-img"
              :src="item.sellerImage"
            >
            <div class="item-right">
              <div
                class="item-top"
              >
                <p class="order-name one-line">
                  {{ item.sellerName }}
                </p>
                <div
                  class="close"
                  @click="deleteComment(item.sellerName)"
                >
                  <i class="icon-close" />
                </div>
              </div>
              <div class="item-bottom">
                <div
                  v-for="(mitem, mindex) in item.menu"
                  :key="mindex"
                >
                  <div class="product-item">
                    {{ mitem.name }}
                    <div class="p-count">
                      x {{ mitem.count }}
                    </div>
                  </div>
                </div>
                <div class="p-total-count">
                  总计{{ item.number }}个菜，实付<span class="total-price">¥{{ item.price }}</span>元
                </div>
              </div>
            </div>
          </div>
          <div class="evaluation clearfix">
            <router-link
              to="/evaluate"
              tab="div"
            >
              <div
                class="evaluation-btn"
                @click="showEvalutate(index)"
              >
                评价
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { Notyf } from 'notyf' // 纯js消息通知插件
import BScroll from 'better-scroll'

export default {
  name: 'Order',
  data() {
    return {
      orders: []
    }
  },
  async mounted() {
    const { status, data: { orders }} = await axios.get('/orders/getOrder')
    if (status === 200) {
      this.orders = orders
    }
    this._initScroll()
  },
  methods: {
    ...mapMutations({ setEvaluateIndex: 'SET_EVALUATEINDEX' }),
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.order, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    showEvalutate(index) {
      this.setEvaluateIndex(index)
      this.$router.push(`/evaluate`)
    },
    deleteComment(sellerName) {
      axios
        .post('/orders/deleteOrder', {
          sellerName: sellerName
        })
        .then(({ status, data }) => {
          const notyf = new Notyf()
          if (status === 200) {
            if (data && data.code === 0) {
              notyf.success(`${data.msg} 删除订单成功!`)
            } else {
              notyf.error(`${data.msg} 删除订单失败!`)
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
@import './order.styl'
</style>
