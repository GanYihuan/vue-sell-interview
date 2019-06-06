<template lang="html">
  <div>
    <Header />
    <home-icon :list="iconList" />
    <Navbar />
  </div>
</template>

<script>
import Navbar from '../navbar/navbar'
import HomeIcon from './icons'
import Header from './header'
import axios from 'axios' // Ajax

export default {
  name: 'Home',
  components: {
    Navbar,
    Header,
    HomeIcon
  },
  data() {
    return {
      swiperList: [],
      iconList: []
    }
  },
  created() {
    axios
      .get('/api/home')
      .then((res) => {
        const { status, data } = res.data
        if (status === 1) {
          this.iconList = data
        }
      }).catch(() => {
      })
  }
}
</script>
