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

<script type="text/ecmascript-6">
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
      /* better-scroll */
      /* at PC will trigger twice event, stop this */
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) /* add food attribute count=1 */
      } else {
        this.food.count++
      }
      // this.$emit('add', event.target)
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
