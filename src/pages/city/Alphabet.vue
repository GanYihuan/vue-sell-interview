<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-08-28 09:53:38
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 15:05:06
 -->
<template>
  <div class="alphabet">
    <div
      v-for="item of letters"
      :key="item"
      :ref="item"
      class="alphabet-item"
      @click="handleLetterClick"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alphabet',
  props: {
    cities: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    letters() {
      const letters = []
      for (const i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './alphabet.styl'
</style>
