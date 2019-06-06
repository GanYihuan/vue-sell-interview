<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(page, index) of pages"
        :key="index"
      >
        <div
          v-for="item of page"
          :key="item.id"
          class="icon"
        >
          <div class="icon-img">
            <img
              :src="item.url"
              class="icon-img-content"
            >
          </div>
          <p class="icon-desc">
            {{ item.name }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: false
      }
    }
  },
  computed: {
    pages() {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8) // Number of icons per page
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      console.log(pages, 'pages---')
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './icons.styl';
</style>
