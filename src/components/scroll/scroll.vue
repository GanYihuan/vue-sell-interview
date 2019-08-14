<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-28 14:27:51
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 05:25:46
 -->
<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    /*
    [better-scroll 官方文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)
    probeType: 1，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
    probeType: 2，会在屏幕滑动的过程中实时的派发 scroll 事件
    probeType: 3，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    default ，probeType: 0，don't distribute scroll event
    */
    probeType: {
      type: Number,
      default: 1
    },
    click: { // better-scroll: 默认情况下，阻止浏览器的本机单击事件。当设置为true时，更好的滚动将分布点击甚至
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: { // 数据是异步的，数据更改以重新计算滚动
      type: Array,
      default: null
    },
    pullup: { // 上拉刷新
      type: Boolean,
      default: false
    },
    beforeScroll: { // 是否派发beforeScroll事件
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    data() { // 监测data的变化
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    setTimeout(() => { // 确保DOM已经渲染
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        const that = this
        this.scroll.on('scroll', pos => { // 监听scroll事件，拿到pos位置对象：有x和y属性
          that.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) { // 当滚动距离小于等于最大的滚动条的距离 + 50 的时候，向外传递一个scrollToEnd的事件
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() { // 禁用better-scroll, 如果不加，scroll的高度会高于内容的高度
      this.scroll && this.scroll.disable()
    },
    enable() { // 启用 better-scroll，默认开启
      this.scroll && this.scroll.enable()
    },
    refresh() { // 强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() { // 滚动到指定的位置；这里使用 apply 将传入的参数，传入到 this.scrollTo()
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() { // 滚动到指定的目标元素
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
