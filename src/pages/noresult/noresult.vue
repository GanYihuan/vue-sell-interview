<template>
  <div class="no-result">
    <div
      class="no-result-icon"
      @click="toMy"
    />
    <p class="no-result-text">
      {{ msg }}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      msg: 'Error: 404'
    }
  },
  methods: {
    toMy() {
      this.$router.push('/my')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './noresult.styl';
</style>
