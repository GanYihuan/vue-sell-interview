﻿<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-05 08:46:02
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 00:10:50
 -->
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
                  @click="deleteComment(item.sellerName, item.number, item.price)"
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
          <div class="evaluation">
            <div
              class="evaluation-btn"
              @click="showEvalutate(index, item.sellerName)"
            >
              评价
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

<script>
import { mapMutations } from 'vuex'
import { Notyf } from 'notyf' // 提示插件
import axios from 'axios' // Promise based HTTP client for the browser and node.js
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
      scrollY: 0 // 实时滚动位置
    }
  },
  computed: {
    showBackTop() {
      return this.scrollY < 0
    }
  },
  created() {
    this.probeType = 3 // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    this.listenScroll = true // 监听scroll事件，拿到pos位置对象：有x和y属性
    this.click = true // 览器的本机单击事件
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    ...mapMutations({
      setEvaluateIndex: 'SET_EVALUATEINDEX',
      setEvaluateSellerName: 'SET_EVALUATESELLNAME'
    }),
    async getOrder() {
      const { status, data: { orders }} = await axios.get('/orders/getOrder')
      if (status === 200) {
        this.orders = orders
      }
    },
    showEvalutate(index, sellerName) {
      this.setEvaluateIndex(index)
      this.setEvaluateSellerName(sellerName)
      this.$router.push(`/evaluate`)
    },
    deleteComment(sellerName, number, price) {
      axios
        .post('/orders/deleteOrder', {
          sellerName: sellerName,
          number: number,
          price: price
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
      this.$refs.order.scrollTo(0, 0, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './order.styl'
</style>
