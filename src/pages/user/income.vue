<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<template v-if="list && list.length">
				<div class="income_wrapper" v-for="(item,index) in list">
					<div class="income_total">
						<span>{{item.month}}</span>
						<strong>{{item.cash | price}}元</strong>
					</div>
					<div class="income_item_wrapper">
						<div class="income_item" v-for="(cItem,cIndex) in item.details">
							<div class="income_item_info">
								<img :src="item.header_img"/>
								<div class="income_item_txt">
									<strong>{{item.name}}</strong>
									<span>{{cItem.time * 1000 | dateFormat }}</span>
								</div>
							</div>
							<div class="income_item_money">
								<span>+{{cItem.cash | price}}</span>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="ui-empty">
					<img src="./images/order_empty_bg.png"/>
					<p>还没有收支明细</p>
				</div>
			</template>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'

	import * as API from '@/api/user'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader
		},

		data () {

			return {

				title: '收支明细',
				list: []

			}

		},

		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			})
		},

		beforeCreate () {

			document.title = '收支明细'

		},

		created () {
			
			this.updatePageView(false)

			this.$showLoading()

			this.getIncomeList()

		},

		methods: {

			...mapActions([
				'updatePageView'
			]),

			pageAction (url) {

				this.$router.push(url)

			},
			/**
			 * 获取收支明细列表
			 *
			 */

			getIncomeList () {
				
				API.getIncomeList({
					type: 'GET'
				}).then((res) => {
					
					this.updatePageView(true)

					this.$hideLoading()
					
					const data = res.data
					if (data && res.status >= 1) {
						
						this.list = data

					} else {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})
			}

		}

	}

</script>

<style lang="scss">
	
	.income_item_wrapper{
		
		padding-left: .4rem;
		
	}
	
	.income_item{
		
		padding: .28rem 0;
		
		display: flex;
		
		justify-content: space-between;
		
		border-bottom: .01rem solid #ddd;
		
	}
	
	.income_item_money{
		
		padding-top: .12rem;
		
		padding-right: .2rem;
		
		span{
		
			color: #2d2d2d;
			
			font-size: .3rem;
		
		}
		
	}
	
	.income_item_txt{
	
		padding-left: .35rem;
		
		strong{
			color: #2d2d2d;
			font-size: .3rem;
			display: block;
			padding-bottom: .12rem;
			
		}
		span{
			color: #787878;
		}
		
	}
	
	.income_item_info{
		
		display: flex;
		
		align-items: center;
		
		img{
			width: .9rem;
			height: .9rem;
			border-radius: 50%;
		}
	}
	
	.income_total{
		
		padding: 0 .4rem;
		
		display: flex;
		
		height: .7rem;
		
		justify-content: space-between;
		
		align-items: center;
		
		background: #f6f6f6;
		
		font-size: .26rem;
		
		span{
			
			color: #2d2d2d;
			
		}
		strong{
			
			color: #787878;
			
		}
	}
	
</style>
