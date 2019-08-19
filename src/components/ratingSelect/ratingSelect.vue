<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2018-12-18 18:39:46
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 12:23:38
 -->
<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span
        class="block"
        :class="{'active':selectType===2}"
        @click="select(2, $event)"
      >
        全部
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span
        class="block"
        :class="{'active':selectType===0}"
        @click="select(0, $event)"
      >
        好评
        <span class="count">{{ positives.length }}</span>
      </span>
      <span
        class="block"
        :class="{'active':selectType===1}"
        @click="select(1, $event)"
      >
        差评
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div
      class="switch"
      :class="{'on':onlyContents}"
      @click="toggleContent"
    >
      <span class="icon-check_circle" />
      <span class="text">只看差评</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1

export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    }
  },
  computed: {
    ...mapState({
      badComment: state => state.badComment
    }),
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    },
    onlyContents() {
      return this.badComment === true
    }
  },
  methods: {
    /**
     * @description: 传出 type, 然后传 type 进来
     * @param {type}
     * @return:
     */
    select(type, event) {
      this.$emit('select', type)
    },
    toggleContent() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './ratingSelect.styl'
</style>
