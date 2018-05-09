<style lang="scss" type="text/css">
	.index-wrapper{
		
	}
	/*.index-enter-active,.index-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.index-enter,.index-leave-to{
		transform: translate3d(-100%,0,0);
	}*/
</style> 
<template>
	<div>
		<mt-header title="登录">
		    <mt-button @click="$router.go(-1)" icon="back" slot="left">返回</mt-button>
			<router-link to="/login" slot="right">
			</router-link>
		</mt-header>
		<slot name="fixed-navbar"></slot>
	</div>		
</template>

</script>
<script>
	// import { Indicator,Toast } from 'mint-ui'
	// import BScroll from 'better-scroll'
	// import {mapState,mapMutations} from 'vuex'
	// import {setStore, getStore} from '@/common/js/savaLocal'
	// import {setDocumentTitle} from '@/common/js/base'
	
	export default {
      data: function() {
        return {
        	
        }
      },
      computed:{
      	
      }
    
    }
</script>
<style lang="scss" type="text/css">
	.index-wrapper{
		
	}
	/*.index-enter-active,.index-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.index-enter,.index-leave-to{
		transform: translate3d(-100%,0,0);
	}*/
</style> 
<template>
	<div>
		<mt-header title="个人中心">
			<router-link to="/login" slot="right">
			</router-link>
		</mt-header>
		<slot name="fixed-navbar"></slot>
	</div>		
</template>

</script>
<script>
	// import { Indicator,Toast } from 'mint-ui'
	// import BScroll from 'better-scroll'
	// import {mapState,mapMutations} from 'vuex'
	// import {setStore, getStore} from '@/common/js/savaLocal'
	// import {setDocumentTitle} from '@/common/js/base'
	
	export default {
      data: function() {
        return {
        	
        }
      },
      computed:{
      	
      }
    
    }
</script>
