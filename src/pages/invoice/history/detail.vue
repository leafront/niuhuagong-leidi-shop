<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>收件信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>收件人：</span>
						<span>详细地址：</span>
					</div>
					<div class="history_cont_info">
						<p><i>张华</i>15112233445</p>
						<p>上海市浦东新区张江高科技园区浦东软件园亮秀路
							112号Y1座512室</p>
					</div>
				</div>
		  </div>
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>订单信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>订单编号：</span>
					</div>
					<div class="history_cont_info">
						<p>561315641266600035</p>
						<p>561315641266600035</p>
					</div>
				</div>
			</div>
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>发票信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>发票抬头：</span>
						<span>纳税人识别号：</span>
						<span>发票金额：</span>
						<span>申请时间：</span>
					</div>
					<div class="history_cont_info">
						<p>上海牛涂科技有限公司</p>
						<p>23563153235665232</p>
						<p><strong>2596.50</strong> 元</p>
						<p>2017-12-24  15:36</p>
					</div>
				</div>
			</div>
			
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>发票号码</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>普通发票：</span>
					</div>
					<div class="history_cont_info">
						<p><strong>58932315</strong></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				list: [{id:'1'},{id:'2'},{id:'3'}],
				title: '开票明细',

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
		
		beforeCreate () {
			
			document.title = '开票明细'
			
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

<style lang="scss">
	
	.history_cont_txt{
	
		width: 1.7rem;
		
		display: flex;
		flex-direction: column;
		
	}
	
	.history_cont_info{
		
		p{
			
			i{
				padding-right: .66rem;
				
			}
			strong{
			
				color: #f65253;
				
			}
			
		}
		
	}
	
	.history_detail_cont{
		
		padding:.3rem .2rem;
		
		display: flex;
		
		color: #9d9d9d;
		
		span,p{
			line-height: .4rem;
		}
		
	}
	
	.history_detail_info{
		
		background: #fff;
		
		margin-bottom: .24rem;
		
		
	}

	.history_detail_tit{
		
		height: .75rem;
		
		border-bottom: .01rem solid #ededed;
		
		padding-left: .2rem;
		
		display: flex;
		
		align-items: center;
		
		h5{
			
			font-size: .28rem;
			
		}
		
	}

</style>