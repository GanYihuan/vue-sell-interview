<template>
  <div class="order">
    <div class="header">
      订单
    </div>
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
              @click="showEvalutate"
            >
              评价
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
  },
  methods: {
    showEvalutate() {
      this.$router.push(`/evaluate`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './order.styl'
</style>
