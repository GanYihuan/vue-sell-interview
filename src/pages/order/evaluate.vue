<template>
  <div class="evalutate">
    <div class="header">
      <router-link
        to="/order"
      >
        <i class="icon-arrow_lift" />
        订单
      </router-link>
    </div>
    <div class="eva-content">
      <div class="star-area">
        <div
          v-for="item in stars"
          :key="item.num"
          class="star-item"
          :class="{'highlight': item.num <= startIndex}"
          @click="addStar(item.num)"
        />
      </div>
      <div class="comment">
        <textarea
          class="comment-input"
          placeholder="亲，菜品的口味如何，商家的服务是否周到?"
          maxLength="50"
        />
        <span class="count">{{ maxCount }}</span>
      </div>
    </div>
    <div class="submit">
      提交评价
    </div>
  </div>
</template>

<script>
export default {
  name: 'Evaluate',
  data() {
    return {
      startIndex: 0,
      stars: [
        {
          num: 0
        },
        {
          num: 1
        },
        {
          num: 2
        },
        {
          num: 3
        },
        {
          num: 4
        }
      ],
      maxCount: 50 // 最多可输入的字符数
    }
  },
  methods: {
    addStar(index) {
      this.startIndex = index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './evaluation.styl'
</style>
