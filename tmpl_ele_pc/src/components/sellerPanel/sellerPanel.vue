<style scoped="scoped" lang="scss" type="text/css">
	@import '../../common/style/mixin';
	.sellerPanel-container{
		width: 100%;
		.item{
			display: flex;
			margin-top: 14px;
			padding:0 8px 22px 14px;
			align-items: flex-start;
			.image{
				width: 72px;
				img{
					border: 1px solid #f5f5f5;
				}
			}
			.content{
				flex: 1;
				.one-line{
					margin-bottom: 8px;
					font-size: 0;
					.brand{
						display: inline-block;
						width: 24px;
						height: 14px;
						font-size: 10px;
						font-weight: 700;
						color: #6f3f15;
						background: #ffe339;
						vertical-align: middle;
						margin-right: 6px;
						i.scale{
							display: inline-block;
							font-size: 20px;
							width: 48px;
							height: 28px;
							line-height: 28px;
							text-align: center;
							font-style: normal;
							font-weight: 700;
							padding: 0;
							box-sizing: border-box;
							transform: scale(.5) translate3d(-50%,-50%,0);
						}
					}
					.title{
						font-size: 16px;
						vertical-align: middle;
						color: #000;
						font-weight: 400;
					}
				}
				.two-line{
					position: relative;
					display: flex;
					align-items: center;
					height: 22px;
					.score{
						font-size: 12px;
						margin-left: 3px;
						vertical-align: middle;
					}
					.sellCount{
						font-size: 12px;
						margin-left: 3px;
						color: #444;
					}
					.desc{
						position: absolute;
						right: 0;
						top: 3px;
						font-size: 0;
						li{
							display: inline-block;
						}
						span{
							display: inline-block;
							font-size: 10px;
							border-radius: 2px;
							i.scale{
								display: block;
								font-size: 20px;
								width: 88px;
								height: 28px;
								line-height: 28px;
								text-align: center;
								font-style: normal;
								padding: 0;
								box-sizing: border-box;
								background:rgba(38,162,255,1);
								border-radius: 4px;
								transform: scale(.5) translate3d(-50%,-50%,0);
							}
						}
						.btn-in{
							margin-right: 4px;
							height: 14px;
							width: 34px;
							background: #ddd;
							box-sizing: border-box;
							text-align: left;
							vertical-align: middle;
							i.scale{
								color: rgba(38,162,255,.97);
								background: #fff;
								width: 68px;
								border: 1px solid rgba(38,162,255,1);
								transform: scale(.5) translate3d(-50%,-50%,0);
							}
						}
						.btn-out{
							vertical-align: middle;
							color: #fff;
							height: 14px;
							width: 44px;
							background: #ddd;
							box-sizing: border-box;
							text-align: left;
						}
					}
				}
				.three-line{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 4px;
					.minPrice{
						font-size: 11px;
						color: #555;
						.deliveryPrice{
							position: relative;
							padding: 0 6px;
							&:before{
								position: absolute;
								left: 0;
								top: 1px;
								height: 10px;
								border-left: 1px solid #ddd;
								content: "";
							}
							&:after{
								position: absolute;
								right: 0;
								top: 1px;
								height: 10px;
								border-left: 1px solid #ddd;
								content: "";
							}
						}
						.perConsume{
							margin-left: 2px;
						}
						.text{
							margin-right: 2px;
						}
					}
					.address{
						font-size: 10px;
						color: #888;
					}
					.deliveryTime{
						font-size: 11px;
						color: #888;
					}
				}
			}
		}
	}
</style>
<template>
	<ul class="sellerPanel-container">
		<div @click="_go(seller)" v-for="seller in sellers" :key="seller.id">
			<li class="item border-1px" >
				<div class="image">
					<img width="60" height="60" :src="seller.image" />
				</div>
				<div class="content">
					<h3 class="one-line">
						<span class="brand" v-if="seller.type===0"><i class="scale">品牌</i></span>
						<span class="title">{{seller.name}}</span>
					</h3>
					<div class="two-line">
						<star :size="10" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
						<span class="sellCount">月售{{seller.sellMonthCount}}单</span>
						<ul class="desc">
							<li v-for="desc in seller.descriptions">
								<span class="btn-in" v-if="desc.type===0"><i class="scale">{{descArr[desc.type]}}</i></span>
								<span class="btn-out" v-if="desc.type===1"><i class="scale">{{descArr[desc.type]}}</i></span>
							</li>
						</ul>
					</div>
					<div class="three-line">
						<p class="minPrice">
							<span class="text">￥{{seller.minPrice}}起送</span>
							<span class="deliveryPrice">配送费￥{{seller.deliveryPrice}}</span>
							<span class="perConsume">￥{{seller.perConsume}}元/人</span>
						</p>
						<div class="right">
							<span class="address">{{distance(seller.address)}}</span>
							<span class="deliveryTime">{{distance(seller.address,1)}}分钟</span>
						</div>
					</div>
				</div>
			</li>
		</div>
	</ul>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import {mapState,mapMutations} from 'vuex'
	import {getStore} from '@/common/js/savaLocal'
	import star from 'components/star/star'
	
	const noError = 0
	const desc = ['准时达','蜂鸟专送']
	
	export default {
		props: {
			sellers:{
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
				descArr:desc
			}
		},
		computed: {
			...mapState([
				'recordAddress'
			])
		},
		methods: {
			_go (seller) {
				this.$router.push({path:'seller',query:{id:seller.id}})
			},
			distance (position,delivery) {
				let _position = this.recordAddress.position
				let lnglat = {}
				if(_position){
					lnglat = new AMap.LngLat(_position[0], _position[1])
				}else {
					let a = JSON.parse(getStore('userposition'))
					if(a){
						lnglat = new AMap.LngLat(a.position[0], a.position[1])
					} else {
						lnglat = new AMap.LngLat(120.1824591,30.270627400000002)
					}
				}
				let diff = Math.round(lnglat.distance(position)/100)/10
				if(delivery){
					return Math.floor(diff*10+(Math.random()*10))
				}
				
			    return diff+'km'
			}
		},
		components:{
			star
		}
	}
</script>
