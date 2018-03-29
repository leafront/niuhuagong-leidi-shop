<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper assets-view" :class="{'visibility':!pageView}">
			<div class="cash">
				<div class="cash_info">
					<div class="cash_info_top">
						<h5>转至 微信钱包</h5>
						<div class="btn" @click="openIncome">查看提现记录</div>
					</div>
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

	import * as Model from '@/model/user'

	import validate from '@/widget/validate'

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

		mixin: ['loading'],

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

			this.getUserAssets()
			
			this.showLoading()
			
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

				Model.getUserAssets({
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
			 * 跳转收入明细
			 *
			 */

			openIncome () {

				this.$router.push('/user/income')
				
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
				
				if (!validate.isNumber(this.cash)) {
					
					this.$toast('请输入正确的提现金额')

					return
					
				}
				
				if (this.cash >= this.cashPrice) {

					this.$toast('账户金额不足，不能申请提现')
					
					return
					
				}
				
				this.$showLoading()
				Model.submitCash({
					type: 'POST',
					data: {
						cash: this.cash
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status >= 1) {

						this.$hideLoading()
						
					  this.$toast(res.msg)
						
						setTimeout(() => {
					  
							this.$router.push('/user/assets')
							
						},2000)
						
					} else {

						this.$hideLoading()

						this.$toast(res.msg)

					}

				})
			}
		}
	}

</script>

<style lang="scss">
	.cash{
		height: 100%;
		background: #f6f6f6;
	}
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
		

		padding: .6rem;
		
		background: #fff;

		.cash_info_top{
			h5{
				float: left;
				text-align: center;
				font-size: .26rem;
				color: #393a3e;
				
			}
			.btn{
				float: right;
				padding: .05rem .1rem;
				line-height: .3rem;
				border: 1px solid #f09007;
				color: #f09007;
				border-radius: .2rem;
			}
			padding-bottom: 1.4rem;
		
		}

	}
	
</style>
