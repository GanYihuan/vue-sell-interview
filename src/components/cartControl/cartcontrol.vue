<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-12-18 18:39:46
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 16:28:54
 -->
<template>
  <div class="cartControl">
    <transition name="move">
      <div
        v-show="food.count>0"
        class="cart-decrease"
        @click.stop.prevent="decreaseCart"
      >
        <span class="inner icon-remove_circle_outline" />
      </div>
    </transition>
    <span
      v-show="food.count>0"
      class="cart-count"
    >{{ food.count }}</span>
    <span
      class="cart-add icon-add_circle"
      @click.stop.prevent="addCart"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) { // better-scroll 在 PC 上将触发两个事件，停止此操作
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) // 增加 food 属性 count=1
      } else {
        this.food.count++
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count !== 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './cartControl.styl';
</style>
