<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
	.mint-tabbar .mint-tab-item {
		.iconfont{
			font-size: 23px;
			color: #26A2FF;
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
	  	  <router-view :animateName="animation">
	  	  	<mt-tabbar slot="fixed-navbar" >
			  <mt-tab-item 
			  :class="$route.name==='index'||$route.path==='/'?'on':''" 
			  :href="$route.name!=='index'||$route.path=='/'?'#/index':''">
			    <span slot="icon"  class="fixed-icon iconfont icon-eliaomo"></span>
			    	外卖
			  </mt-tab-item>
			  <mt-tab-item 
			  :class="$route.name==='order'?'on':''" 
			  :href="$route.name!=='order'?'#/order':''">
			     <span slot="icon" class="fixed-icon iconfont icon-activity"></span>
			    	订单
			  </mt-tab-item>
	
			  <mt-tab-item
			  :class="$route.name==='user'?'on':''" 
			  :href="$route.name!=='user'?'#/user':''" >
			     <span slot="icon" class="fixed-icon iconfont icon-account"></span>
			    	我的
			  </mt-tab-item>
			</mt-tabbar>
	  	  </router-view>
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
