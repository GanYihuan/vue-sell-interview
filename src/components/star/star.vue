<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-12-18 18:39:46
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 05:37:52
 -->
<template>
  <div
    class="star"
    :class="starType"
  >
    <span
      v-for="itemClass in itemClasses"
      :key="itemClass.id"
      class="star-item"
      :class="itemClass"
    />
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'Star',
  props: {
    size: {
      type: Number,
      default() {
        return 0
      }
    },
    score: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      const result = []
      const score = Math.floor(this.score * 2) / 2 // Math.floor: 4.9 -> 4, Math.ceil: 4.1 -> 5
      const hasDecimal = score % 1 !== 0 // If there is a decimal, half star
      const integer = Math.floor(score) // Full star
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './star.styl'
</style>
