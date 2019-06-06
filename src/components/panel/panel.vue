<template lang="html">
  <section :class="[panelClass,cname]">
    <h4>{{ title }}</h4>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panelClass: 'panel'
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/_mixin.scss';

.panel {
	@include panel;
}
</style>
