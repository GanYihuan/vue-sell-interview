<template>
  <div class="list-content">
    <h4 class="list-title">
      <span class="title-line" />
      <span>附近商家</span>
      <span class="title-line" />
    </h4>
    <ul>
      <!-- router-link default change <a></a> -->
      <router-link
        v-for="item of merchant"
        :key="item.id"
        :to="'/home'"
        class="item border-bottom"
        tag="li"
      >
        <img
          :src="item.poi_pic"
          class="item-img"
        >
        <div class="item-info">
          <p class="item-title">
            {{ item.poi_name }}
          </p>
          <p class="item-desc">
            {{ item.desc }}
          </p>
          <button class="item-button">
            查看详情
          </button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Merchant',
  props: {
    merchant: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './merchant.styl'
</style>

