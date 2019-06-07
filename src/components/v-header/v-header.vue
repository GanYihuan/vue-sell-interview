<template>
  <div class="header">
    <div class="content-wrapper">
      <div
        class="back"
        @click="backHome"
      >
        <i class="icon-arrow_lift" />
      </div>
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand" />
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <!-- async pass seller data to header, prevent seller.supports[0].type is null -->
        <div
          v-if="seller.supports"
          class="support"
        >
          <span
            class="icon"
            :class="classMap[seller.supports[0].type]"
          />
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
        <div
          v-if="seller.supports"
          class="support-count"
          @click="showDetail"
        >
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right" />
        </div>
      </div>
    </div>
    <div
      class="bulletin-wrapper"
      @click="showDetail"
    >
      <span class="bulletin-title" /><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right" />
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div
        v-show="detailShow"
        class="detail"
      >
        <!-- sticky layout: 1,2,3,4,5,6 -->
        <!-- 1: Divided into A B package -->
        <!-- 2: A clearfix -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">
              {{ seller.name }}
            </h1>
            <div class="star-wrapper">
              <star
                :size="48"
                :score="seller.score"
              />
            </div>
            <div class="title">
              <!-- don't use span, adapt to android -->
              <div class="line" />
              <div class="text">
                优惠信息
              </div>
              <div class="line" />
            </div>
            <ul
              v-if="seller.supports"
              class="supports"
            >
              <li
                v-for="(item,index) in seller.supports"
                :key="item.type"
                class="support-item"
              >
                <span
                  class="icon"
                  :class="classMap[seller.supports[index].type]"
                />
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line" />
              <div class="text">
                商家公告
              </div>
              <div class="line" />
            </div>
            <div class="bulletin">
              <p class="content">
                {{ seller.bulletin }}
              </p>
            </div>
          </div>
        </div>
        <!-- B package -->
        <div
          class="detail-close"
          @click="hideDetail"
        >
          <i class="icon-close" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star'

export default {
  name: 'VHeader',
  components: {
    star
  },
  props: {
    seller: { /* [res.data](http://localhost:8088/api/seller) */
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    },
    backHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './v-header.styl'
</style>
