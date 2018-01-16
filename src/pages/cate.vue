<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<ul class="order_menu_list" v-show="isShow">
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

	import * as Model from '@/model/home'
	
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
				isShow: false,
				orderTxt: [{
					name:'全部',
					id: -1
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
		mixin: ['loading'],
		beforeCreate () {
			
			document.title = '分类'
			
		},
		created (){

			this.updatePageView(false)
			
			this.getProductList(this.id)

			this.showLoading()

		},
		methods: {
			...mapActions([
				'updatePageView',
			]),
			
			/**
			 * @param {String} id
			 */
			showTab (id) {

				this.id = id;

				this.getProductList(id)
			},

			/**
			 * 获取分类列表
			 * @param {String} cateId
			 */
			getProductList (cateId) {

				Model.getProductList({
					type: 'GET',
					data:{
						cate_id: cateId
					}
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