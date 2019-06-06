<template>
  <div class="panel">
    <h4>{{ title }}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panel: 'panel'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../assets/scss/_mixin.scss';

.panel {
	@include panel;
	// width: 100%
	position: fixed;
	left: 0;
	right: 0;
	// width: 100%
	bottom: 0;
	margin: 0;
  height: 100px;
  background: #ff0;
	> h4 {
		display: none;
	}
	.content {
		@include flex(row);
		justify-content: space-around;
		li {
			text-align: center;
			a {
				text-decoration: none;
			}
			img {
				display: inline-block;
				margin: 12px auto 6px;
				width: 44px;
				height: 44px;
			}
			p {
				font-size: 22px;
				color: #656565;
			}
		}
	}
}
</style>
