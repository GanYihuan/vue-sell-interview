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
import ApiServer from 'api'
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
    this._fetch()
  },
  methods: {
    getHomeInfo() {
      axios
        .get('/api/home.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc(res) {
      res = res.data
      console.log(res, 'res--')
    },
    _fetch() {
      if (!this.fetched) {
        this.fetched = true
        ApiServer
          .getHome()
          .then(res => {
            this.iconList = res
          })
      }
    }
  }
}
</script>
