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

<script type="text/ecmascript-6">
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
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
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
  updated() { // virtual DMO re-render and patch
    this.startY = this.$refs['A'][0].offsetTop // startY: 'A' Distance from the top of the parent element
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './alphabet.styl';
</style>
