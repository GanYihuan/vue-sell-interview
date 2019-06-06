<template lang="html">
  <div>
    <Header />
    <home-icon :list="iconList" />
    <split />
  </div>
</template>

<script>
import HomeIcon from './icons'
import Header from './header'
import axios from 'axios' // Ajax
import Split from '../split/split'

export default {
  name: 'Home',
  components: {
    Header,
    HomeIcon,
    Split
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
