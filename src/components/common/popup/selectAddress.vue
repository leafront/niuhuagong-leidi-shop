<template>
	<div class="select_popup" :class="{'active':isOverlayVisible == 3}">
		<div class="select_popup_tit" @click="updateIsOverlayVisible(2)">
			<span>收货地址</span>
			<svg aria-hidden="true" class="ico order_arrow_bot">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
				</use>
			</svg>
		</div>
		<div class="select_address_item">
			<div class="select_address_circle">
				<div class="select_address_checked">
					<svg aria-hidden="true" class="ico ico-gou">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
						</use>
					</svg>
				</div>
			</div>
			<div class="select_address_info">
				<div class="select_address_txt">
					<span>张华</span>
					<span>15112233445</span>
				</div>
				<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
			</div>
			<div class="select_address_edit" @click="editAddress">
				<svg aria-hidden="true" class="ico icon-bianji">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
					</use>
				</svg>
			</div>
		</div>
		<div class="select_address_item">
			<div class="select_address_circle">
				<div class="select_address_checked active">
					<svg aria-hidden="true" class="ico ico-gou">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
						</use>
					</svg>
				</div>
			</div>
			<div class="select_address_info">
				<div class="select_address_txt">
					<span>张华</span>
					<span>15112233445</span>
				</div>
				<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
			</div>
			<div class="select_address_edit">
				<svg aria-hidden="true" class="ico icon-bianji">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji"></use>
				</svg>
			</div>
		</div>
		<div class="select_address_add" @click="updateIsOverlayVisible(4)">
			<svg aria-hidden="true" class="ico icon-jia">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
			</svg>
			<span>新建地址</span>
		</div>
		<div class="select_address_submit">
			<span class="submit_button">确认</span>
		</div>
	</div>

</template>

<script>
	
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		
		data () {
			
			return {
			
			}
			
		},
		
		methods: {
			
			...mapActions([
				'updateIsOverlayVisible'
			]),

			editAddress () {
				
				this.updateIsOverlayVisible(5)
				
			}
			
		},
		
		computed: {
			...mapGetters({
				'isOverlayVisible': 'getIsOverlayVisible'
			})
		},
		
		created () {
		
		
		
		}
		
	}
	
</script>

<style lang="scss">
	
	.select_address_submit{
	
		padding: 0 .22rem .5rem;
		
		span{
		
			background: #1ba0e5;
		
		}
		
	}
	
	.select_address_add{
		
		padding: .7rem 0;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.icon-jia{
		
			width: .55rem;
			height: .55rem;
			
			color: #9d9d9d;
			
		}
		
		span{
		
			font-size: .28rem;
			
			padding-left: .2rem;
		
		}
		
	}
	
	.select_address_edit{
	
		width:.7rem;
		
		height: 1.46rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.select_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
	}
	
	.select_address_circle{
		
		display: flex;
		
		align-items: center;
		
		width: .78rem;
		height: 1.46rem;
		
	}
	
	.select_address_info{
		
		p{
			
			color: #9d9d9d;
		}
	}
	
	.select_address_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		border: .02rem solid #252525;
		
		&.active{
		
			background: #252525;
			
		}
		
		.ico-gou{
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
		
		
	}
	
	.select_address_item{
		
		height: 1.46rem;
		
		padding: 0 .22rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}

	

</style>