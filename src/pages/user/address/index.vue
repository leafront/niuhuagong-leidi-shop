<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
			<div class="address_manage_info">
				<div class="address_item">
					<div class="address_info">
						<div class="address_txt">
							<span>张华</span>
							<strong>15112233445</strong>
						</div>
						<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
					</div>
				</div>
				<div class="address_default">
					<div class="form_address_wrapper">
						<div class="address_checked active">
							<svg aria-hidden="true" class="ico ico-gou">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
								</use>
							</svg>
						</div>
						<span>设为默认地址</span>
					</div>
					<div class="address_action">
						<div class="form_address_del">
							<svg aria-hidden="true" class="ico ico-del">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-shanchu">
								</use>
							</svg>
						</div>
						<div class="address_edit" @click="pageAction('/user/address/edit')">
							<svg aria-hidden="true" class="ico icon-bianji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
								</use>
							</svg>
						</div>
					</div>
				
				</div>
			</div>
			<div class="address_manage_info">
				<div class="address_item">
					<div class="address_info">
						<div class="address_txt">
							<span>张华</span>
							<strong>15112233445</strong>
						</div>
						<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
					</div>
				</div>
				<div class="address_default">
					<div class="address_wrapper">
						<div class="address_checked active">
							<svg aria-hidden="true" class="ico ico-gou">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
								</use>
							</svg>
						</div>
						<span>设为默认地址</span>
					</div>
					<div class="address_action">
						<div class="form_address_del">
							<svg aria-hidden="true" class="ico ico-del">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-shanchu">
								</use>
							</svg>
						</div>
						<div class="address_edit">
							<svg aria-hidden="true" class="ico icon-bianji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
								</use>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="address_submit" @click="pageAction('/user/address/add')">
			<svg aria-hidden="true" class="ico icon-add">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia2">
				</use>
			</svg>
			<span>新建地址</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	.address_submit{
		
		margin: 0 .2rem .6rem .2rem;
		
		display: flex;
		
		height: .82rem;
		
		border-radius: .4rem;
		
		background: #1ba0e5;
		
		align-items: center;
		
		justify-content: center;
		
		.icon-add{
			
			width: .35rem;
			
			height: .35rem;
			
			color: #fff;
		}
		
		span{
			
			padding-left: .15rem;
			
			color: #fff;
			
			font-size: .32rem;
			
		}
	}
	
	.address_action{
		
		display: flex;
		
		height: .8rem;
		
		align-items: center;
		
	}
	
	.address_wrapper{
		
		display: flex;
		
	}
	
	
	.address_manage_info{
		
		padding: 0 .22rem;
		
		background: #fff;
		
		margin-bottom: .24rem;
		
		&:last-child{
			
			margin-bottom:0;
			
		}
		
		
	}
	
	.form_address_del{
		
		width: .7rem;
		
		height: .8rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.ico-del{
			
			width: .36rem;
			
			height: .4rem;
			
		}
		
	}
	
	.form_address_wrapper{
		
		display: flex;
		
		height: .8rem;
		
		align-items: center;
		
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
	
	
	.address_edit{
		
		width:.7rem;
		
		height: .8rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.address_txt{
		
		display: flex;
		
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
		align-items: center;
		
		strong{
			
			padding-left: .3rem;
			
		}
		
	}
	
	
	.address_info{
		
		p{
			
			color: #9d9d9d;
		}
	}
	
	.address_item{
		
		height: 1.46rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}
	
	
	.address_default{
		
		height: .8rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		span{
			
			padding-left: .2rem;
			
		}
		
	}
	
	.address_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		border: .02rem solid #252525;
		
		background:#fff;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		&.active{
			
			background: #252525;
			
		}
		
		.ico-gou{
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}

</style>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {

				title: '地址管理'

			}


		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},

		methods: {

			...mapActions([
				'updatePageView',
			]),
			pageAction(url) {
				
				this.$router.push(url)
				
			}
		},

		created (){

			this.updatePageView(false)

			this.$showLoading()

			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()

			},300)

		}

	}

</script>