<template>
  <div class="orderPage">
    <div class="header">
      评价
    </div>
    <Scroll
      ref="order"
      class="order"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
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

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { Notyf } from 'notyf' // 纯js消息通知插件
// import BScroll from 'better-scroll'
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
    // this._initScroll()
    this.getOrder()
  },
  methods: {
    ...mapMutations({ setEvaluateIndex: 'SET_EVALUATEINDEX' }),
    // _initScroll() {
    //   this.$nextTick(() => {
    //     if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.order, {
    //         click: true
    //       })
    //     } else {
    //       this.scroll.refresh()
    //     }
    //   })
    // },
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
