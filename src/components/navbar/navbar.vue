<template lang="html">
  <Panel
    :class="$style.panel"
    title="导航条"
  >
    <ul :class="$style.content">
      <li>
        <router-link to="/goods">
          <img
            src="//img12.360buyimg.com/jrpmobile/jfs/t3451/188/644771475/2428/800d7cb7/580f2435Nbfaa8055.png?width=66&height=66"
            alt=""
          >
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/shop">
          <img
            src="//img12.360buyimg.com/jrpmobile/jfs/t3811/55/345433999/2930/116d3dd1/580f1e25N028a1f2c.png?width=66&height=66"
            alt=""
          >
          <p>购物</p>
        </router-link>
      </li>
    </ul>
    <router-view />
  </Panel>
</template>

<script>
import Panel from '../panel/panel'
export default {
  components: {
    Panel
  }
}
</script>

<style lang="scss" module>
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
  background: #f00;
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
