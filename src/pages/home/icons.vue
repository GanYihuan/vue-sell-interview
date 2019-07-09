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
          <div class="icon-desc">
            {{ item.name }}
          </div>
        </div>
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
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
        autoplay: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    pages() {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './icons.styl';
</style>
