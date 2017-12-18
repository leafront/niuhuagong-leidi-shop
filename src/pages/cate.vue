<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<ul class="order_menu_list">
			<li v-for="(item,i) in orderTxt" :class="{'active': id == item.id}" @click="showTab(i)"><span>{{item.name}}</span></li>
		</ul>
		<div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
			<List :list="list"/>
		</div>
	</div>
</template>

<script>
	
	import AppHeader from '@/components/common/header'

	import List from '@/components/home/list'

	import { mapActions, mapGetters } from 'vuex'

	import * as API from '@/api/home'
	
	export default {
		
		components: {
			AppHeader,
			List
		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},
		data () {
			
			return {
				title: '分类',
				id: this.$route.query.id,
				list: [],
				orderTxt: [{
					name:'全部',
					id: 0
				},{
					name:'填缝剂',
					id: 1
				},{
					name:'瓷砖胶',
					id: 2
				},{
					name:'其他',
					id: 3
				}]
			}
		},

		created (){

			this.updatePageView(false)

			this.$showLoading()

			this.getProductList(1)

		},
		methods: {
			...mapActions([
				'updatePageView',
			]),
			showTab (id) {

				this.id = id;
			},
			getProductList (cateId) {

				API.getProductList({
					cate_id: cateId
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.list = data

					} else {

						this.$toast(data.msg)

					}

					this.updatePageView(true)

					this.$hideLoading()

				})

			}
		}
		
	}
	
</script>

<style lang="scss">
	
	.order_menu_list{
		
		height: .75rem;
		
		display: flex;
		
		padding: 0 .24rem;
		
		background: #fff;
		
		li{
			
			display: flex;
			
			justify-content: center;
			
			align-items: center;
			
			flex: 1;
			
			border-bottom: .04rem solid transparent;
			
			color: #252525;
			
			&.active {
				
				border-bottom: .04rem solid #008aec;
				
			}
			
		}
		
	}
</style>