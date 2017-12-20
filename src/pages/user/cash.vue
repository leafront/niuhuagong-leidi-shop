<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper assets-view">
			<div class="cash">
				<div class="cash_info">
					<h5>转至 微信钱包</h5>
					<div class="cash_info_input">
						<i>￥</i>
						<input type="tel" v-model.trim="cash" class="cash_input_money"/>
					</div>
					<div class="cash_account">
						<span>当前账户余额{{cashPrice | price}}元</span>
					</div>
					<div class="cash_submit" @click="submitCash">
						<span class="submit_button">提现</span>
					</div>
					<div class="cash_tips">
						<span>申请提交后，会1-2个工作日内通过审核</span>
					</div>
				</div>
			</div>
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

				title: '提现',
				cashPrice: '',
				cash: ''

			}
		},

		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			})
		},

		beforeCreate (){

			document.title = '提现'

		},
		
		created () {

			this.updatePageView(false)

			this.$showLoading()

			this.getUserAssets()
			
		},
		methods: {
			...mapActions([
				'updatePageView'
			]),

			/**
			 *
			 * 获取用户当前金额
			 */

			getUserAssets () {

				API.getUserAssets({
					type: 'GET'
				}).then((res) => {

					this.updatePageView(true)
					this.$hideLoading()

					const data = res.data

					if (res.status >= 1) {

						this.cashPrice = data.cash

					} else {

						this.$toast(res.msg)

					}

				})

			},

			/**
			 * 提交用户提现
			 *
			 */

			submitCash() {
				
				if (!this.cash) {
					
					this.$toast('请输入提现金额')
					
					return
					
				}

				API.submitCash({
					type: 'POST',
					data: {
						cash: this.cash
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status >= 1) {

						this.list = data

					} else {

						this.$toast(res.msg)

					}

				})

			}

		}
	}

</script>

<style lang="scss">
	
	.cash_tips{
		
		padding-top: .2rem;
		
		text-align: center;
		
		span{
			
			color: #aaa;
			
		}
		
	}
	
	.cash_submit{
		
		background: #f09007;
		
	}
	
	.cash{
	
		padding: .58rem .58rem 0;
	
	}
	
	.cash_account{
		
		margin-top: .7rem;
		
		padding-top: .3rem;
		
		padding-bottom:.78rem;
		
		border-top: .01rem solid #c4c4c5;
		
		text-align: center;
		
		span{
			
			color: #aaa;
			
		}
		
	}
	
	.cash_info_input{
		
		display: flex;
		
		i{
			
			font-size: .48rem;
			
			color:#1c1c1d;
			
		}
		
		.cash_input_money{
			
			width: 100%;
			
			padding-left: .5rem;
			
			font-size: .6rem;
			
		}
		
	}
	
	.cash_info{
		
		padding: .65rem;
		
		background: #fff;
		
		h5{
			
			text-align: center;
			font-size: .26rem;
			color: #393a3e;
			
			padding-bottom: 1.4rem;
			
		}
		
	}
	
</style>
