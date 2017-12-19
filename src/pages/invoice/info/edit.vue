<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="billing_type">
				<div class="billing_type_item" @click="showTab(item.index)" v-for="(item,index) in typeList">
					<div class="billing_address_checked" :class="{'active': type==item.index}">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>{{item.name}}</span>
				</div>
			</div>
			<div class="billing_form" v-show="type==1">
				<div class="ui-form-item">
					<input type="text" placeholder="发票姓名" class="ui-form-input"/>
				</div>
			</div>
			<div class="billing_form" v-show="type==2">
				<div class="ui-form-item">
					<input type="text" placeholder="公司名称" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="纳税人识别号" class="ui-form-input"/>
				</div>
			</div>
			<div class="billing_form" v-show="type==3">
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
	
	@import './index.scss';

</style>

<script>

	import AppHeader from '@/components/common/header'

	export default {

		components: {
			AppHeader

		},
		data () {

			return {
				type: 1,
				title: '编辑开票信息',
				typeList:[{index:1,name:'个人'},{index:2,name:'企业普票'},{index:3,name:'企业增票'}]

			}

		},

		beforeCreate () {

			document.title = '编辑开票信息'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},
			showTab (type) {

				this.type = type

			}

		}

	}

</script>