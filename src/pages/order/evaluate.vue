<template>
  <div class="content">
    <!-- <NavHeader title="评价" /> -->
    <div class="eva-content">
      <div class="nav">
        <h4 class="title">
          评价
        </h4>
      </div>
      <div class="star-area" />
      <div class="comment">
        <textarea
          class="comment-input"
        />
        <span class="count" />
      </div>
      <p class="one-line product-name">
        +厚切鸡排 香辣口水鸡饭. 中辣
      </p>
    </div>
    <div class="submit">
      提交评价
    </div>
  </div>
</template>

<script>
export default {
  name: 'Evaluate'
}
</script>

<style lang="stylus" scoped>
@import './evaluation.styl'
</style>
