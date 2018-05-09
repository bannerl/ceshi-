<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
	.mint-tabbar .mint-tab-item {
		.iconfont{
			font-size: 23px;
			color: $g_blue;
		}
		&.is-selected {
			color: #888;
			background-color: #fff;
			.iconfont {
				color: #888;
			}
		}
		&.on {
			color: #26A2FF;
			.iconfont {
				color:#26a2ff;
			}
		}
	}
</style>
<template>
  <div>
  	<div class="main-top">
	  	<router-view></router-view>
  	</div>
  	
  </div>
</template>

<script>
	import {loadUrl} from '@/common/js/util'
	import {setStore, getStore} from '@/common/js/savaLocal'
	
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		childData:'',
	  		animation: false
	  	}
	  },
	  computed: {
	  	
	  },
	  created () {

	  },
	  watch: {
	    '$route' (to, from) {
		  console.log(to)
	    }
	 }
	}
	
</script>
