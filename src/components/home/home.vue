<template lang="html">
  <div>
    <Header />
    <Navbar />
  </div>
</template>

<script>
import Navbar from '../navbar/navbar'
import Header from './header'

export default {
  name: 'Home',
  components: {
    Navbar,
    Header
  },
  data() {
    return {
      swiperList: []
    }
  }
}
</script>

<style>
</style>

