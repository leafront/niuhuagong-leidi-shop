<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="billing_type">
				<div class="billing_type_item">
					<div class="billing_address_checked active">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>个人</span>
				</div>
				<div class="billing_type_item">
					<div class="billing_address_checked active">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>企业普票</span>
				</div>
				<div class="billing_type_item">
					<div class="billing_address_checked active">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>企业增票</span>
				</div>
			</div>
			<div class="billing_form">
				<div class="ui-form-item">
					<input type="text" placeholder="公司名称" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="纳税人识别号" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="公司地址" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="公司电话" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="开户银行" class="ui-form-input"/>
				</div>
				<div class="billing_upload">
					<div class="billing_upload_wrapper">
						<div class="billing_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
						</div>
						<p>营业执照(三证合一)</p>
					</div>
					<div class="billing_upload_wrapper">
						<div class="billing_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
						</div>
						<p>一般纳税人资质证明</p>
					</div>
				</div>
			</div>
		</div>
		<div class="billing_submit">
			<span class="submit_button">确认</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	.billing_submit{
		padding: 0 .2rem .5rem;
		span{
			background: #1ba0e5;
			
		}
		
	}
	
	.billing_upload_wrapper{
		
		p{
			
			color: #9d9d9d;
			
			line-height: .6rem;
			
			text-align: center;
			
		}
		
	}
	
	.billing_upload{
		
		margin-top: .24rem;
		
		display: flex;
		
		justify-content: space-between;
		
	}
	
	.billing_upload_item{
		
		width: 3.38rem;
		
		height: 1.95rem;
		
		background: #f6f6f6;
		
		display: flex;
		
		align-items: center;
		
		border-radius: .2rem;
		
		justify-content: center;
		
		.ico-xiangji{
			
			width: 1.2rem;
			
			height: 1.2rem;
			
			color: #cecece;
			
		}
		
	}
	
	.billing_form{
		
		padding:0 .2rem;
		
	}
	
	.billing_type{
		
		display: flex;
		
		padding:0 .4rem;
		
		
	}
	
	.billing_type_item{
		
		padding-top: .38rem;
		
		padding-bottom: .14rem;
		
		display: flex;
		
		align-items: center;
		
		margin-right: 1.12rem;
		
		&:last-child{
			
			margin-right:0;
		}
		
		span{
			
			padding-left: .28rem;
			
			color: #9d9d9d;
			
		}
		
	}
	
	.billing_address_checked{
		
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

</style>

<script>

	import AppHeader from '@/components/common/header'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				title: '新建开票信息'

			}

		},

		beforeCreate () {

			document.title = '新建开票信息'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			}

		}

	}

</script>