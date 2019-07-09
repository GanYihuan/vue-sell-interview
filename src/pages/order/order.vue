<template>
  <div class="orderPage">
    <div class="header">
      订单
    </div>
    <Scroll
      ref="order"
      class="order"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="orders"
      @scroll="scroll"
    >
      <div class="order-list">
        <div
          v-for="(item, index) in orders"
          :key="index"
          class="order-item"
        >
          <Split />
          <div class="order-item-inner">
            <img
              class="item-img"
              :src="item.sellerImage"
            >
            <div class="item-right">
              <div class="item-top">
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
            <div
              class="evaluation-btn"
              @click="showEvalutate(index)"
            >
              待评价
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="showBackTop"
        class="back-to-ceiling"
        @click="backTop"
      >
        <i class="icon-circle-up" />
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import { mapMutations } from 'vuex'
import { Notyf } from 'notyf' // Pure js message notification plugin
import Split from 'components/split/split'
import Scroll from 'components/scroll/scroll'

export default {
  name: 'Order',
  components: {
    Split,
    Scroll
  },
  data() {
    return {
      orders: [],
      scrollY: 0 // real time roll position
    }
  },
  computed: {
    showBackTop() {
      return this.scrollY < 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.click = true
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    ...mapMutations({
      setEvaluateIndex: 'SET_EVALUATEINDEX'
    }),
    async getOrder() {
      const { status, data: { orders }} = await axios.get('/orders/getOrder')
      if (status === 200) {
        this.orders = orders
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
              this.getOrder()
            } else {
              notyf.error(`${data.msg} 删除订单失败!`)
            }
          } else {
            notyf.error(`服务器出错，错误码:${status}`)
          }
        })
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    backTop() {
      this.$refs.order.scrollTo(0, 0, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './order.styl'
</style>
