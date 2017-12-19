<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="address_title_wrapper">
				<div class="address_title">
					<h5>开票资料</h5>
					<span @click="deleteItem" v-show="isDelete">删除</span>
				</div>
			</div>
			<div class="billing_address_item" v-for="(item,index) in list">
				<div class="ui-checked" @click="selectItem(item.id)">
					<div class="ui-checked-radio" :class="{'active':billingAddress[item.id]}">
						<svg aria-hidden="true" class="ico ui-checked-ico">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
				</div>
				<div class="billing_address_info">
					<div class="billing_address_txt">
						<span>个人</span>
					</div>
					<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
				</div>
				<div class="billing_address_edit" @click="pageAction('/invoice/info/edit/'+item.id)">
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
			</div>
			<div class="select_address_add" @click="pageAction('/invoice/info/add')">
				<svg aria-hidden="true" class="ico icon-jia">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
				</svg>
				<span>新建地址</span>
			</div>
		</div>
		<div class="billing_address_submit">
			<span class="submit_button">确认</span>
		</div>
	
	</div>
</template>

<style lang="scss">
	
	@import '../address.scss';

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
				list: [{id:'1'},{id:'2'},{id:'3'}],
				title: '开票资料',
				selectNum: 1,
				billingAddress:{}

			}


		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			}),
			isDelete () {

				const list = this.list
				const billingAddress = this.billingAddress

				const isDelete = list.some((item) => {

					return  billingAddress[item.id]

				})

				return isDelete

			}
		},

		methods: {

			...mapActions([
				'updatePageView',
			]),

			checkedAddress () {

				this.$router.back()

			},
			pageAction(url) {

				this.$router.push(url)

			},

			selectItem (id) {

				this.billingAddress[id] = !this.billingAddress[id]

			},
			deleteItem (id) {

				const billingAddress = this.billingAddress
				const list = this.list

				for (let len = list.length, i = len - 1; i >=0; i--) {

					if (billingAddress[list[i].id]) {

						this.list.splice(i,1)

					}

				}

			}
		},

		created (){

			this.updatePageView(false)

			let billingAddress = {}

			this.list.forEach((item) => {

				billingAddress[item.id] = false

			})

			this.billingAddress = billingAddress

			this.$showLoading()

			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()

			},300)

		}

	}

</script>