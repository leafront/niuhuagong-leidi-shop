<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="history_detail_info">
				<div class="history_detail_tit" @click="updateIsOverlayVisible(2)">
					<h5>收件地址</h5>
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>订单信息：</span>
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
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>公司名称：</span>
						<span>纳税人识别号：</span>
						<span>发票金额：</span>
						<span>申请时间：</span>
					</div>
					<div class="history_cont_info">
						<p>上海牛涂科技有限公司</p>
						<p>23563153235665232</p>
						<p>2596.50 元</p>
						<p>2017-12-24  15:36</p>
					</div>
				</div>
			</div>
		</div>
		<EditAddress/>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'
	
	import EditAddress from '@/components/invoice/editAddress'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader,
			EditAddress

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
				'updateIsOverlayVisible'
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
		
		justify-content: space-between;
		
		h5{
			
			font-size: .28rem;
			
		}
		.icon-bianji{
			
			width: .25rem;
			height: .25rem;
			color: #9d9d9d;
			
			margin-right: .2rem;
			
		}
		
	}

</style>