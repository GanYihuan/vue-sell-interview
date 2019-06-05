<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span
        class="block positive"
        :class="{'active':selectType===2}"
        @click="select(2, $event)"
      >
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span
        class="block positive"
        :class="{'active':selectType===0}"
        @click="select(0, $event)"
      >
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span
        class="block negative"
        :class="{'active':selectType===1}"
        @click="select(1, $event)"
      >
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div
      class="switch"
      :class="{'on':onlyContent}"
      @click="toggleContent"
    >
      <span class="icon-check_circle" />
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
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
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '吐槽'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type, event) {
      /* better-scroll, at PC will trigger twice event, stop this */
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import 'ratingSelect.scss';
</style>
