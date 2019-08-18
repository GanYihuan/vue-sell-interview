<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-07 07:06:18
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 01:09:25
 -->
<template>
  <div class="list-content">
    <h4 class="list-title">
      <span class="title-line" />
      <span>附近商家</span>
      <span class="title-line" />
    </h4>
    <ul>
      <router-link
        v-for="item of merchant"
        :key="item.id"
        :to="{name: 'shop', params: {id: item.name}}"
        tag="li"
      >
        <div
          class="item border-bottom"
          @click="saveMerchantInfo(item.name, item.pic_url)"
        >
          <img
            :src="item.pic_url"
            class="item-img"
          >
          <div
            class="brand"
            :class="item.delivery_type > 0 ? 'brand-pin' : 'brand-xin'"
          >
            {{ item.delivery_type > 0 ? '品牌' : '新到' }}
          </div>
          <div class="item-info">
            <div class="item-title">
              {{ item.name }}
            </div>
            <div class="item-desc">
              <div class="item-score">
                <Star
                  :size="24"
                  :score="item.wm_poi_score"
                />
              </div>
              <div class="item-count">
                月售{{ item.month_sale_num > 999 ? '999+' : item.month_sale_num }}
              </div>
              <div class="item-distance">
                {{ item.distance }}
              </div>
              <div class="item-time">
                {{ item.mt_delivery_time }}&nbsp;|
              </div>
            </div>
            <div class="item-price">
              <div class="item-pre-price">
                {{ item.min_price_tip }}
              </div>
              <div
                class="item-delivery-type"
                :class="{'highlight': item.delivery_type>0}"
              >
                美团专送
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Star from 'components/star/star'

export default {
  name: 'Merchant',
  components: {
    Star
  },
  props: {
    merchant: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    ...mapMutations({
      setSellName: 'SET_SELLNAME',
      setSellImage: 'SET_SELLIMAGE'
    }),
    saveMerchantInfo(name, img) {
      this.setSellName(name)
      this.setSellImage(img)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './merchant.styl'
</style>

