<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		  <div class="scroll-view-wrapper white-view" :class="{'visibility':!pageView}">
			  <div class="address_title_wrapper">
				  <div class="address_title">
					  <h5>地址管理</h5>
					  <span @click="deleteItem" v-show="isDelete">删除</span>
				  </div>
			  </div>
				<div class="select_address_item" v-for="(item,index) in list">
					<div class="ui-checked"  @click="selectItem(item.id)">
						<div class="ui-checked-radio" :class="{'active':selectAddress[item.id]}">
							<svg class="ico ui-checked-ico"  aria-hidden="true">
								<use xlink:href="#icon-gou"></use>
							</svg>
						</div>
					</div>
					<div class="select_address_info" @click="checkedAddress">
						<div class="select_address_txt">
							<span>张华</span>
							<span>15112233445</span>
						</div>
						<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
					</div>
					<div class="select_address_edit" @click="pageAction('/user/address/edit/'+item.id)">
						<svg aria-hidden="true" class="ico icon-bianji">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
							</use>
						</svg>
					</div>
				</div>
			  <div class="select_address_add" @click="pageAction('/user/address/add')">
				  <svg aria-hidden="true" class="ico icon-jia">
					  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
				  </svg>
				  <span>新建地址</span>
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
				title: '地址管理',
				selectNum: 1,
				selectAddress:{}

			}


		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			}),
			isDelete () {
				
				const list = this.list
				const selectAddress = this.selectAddress
				
				const isDelete = list.some((item) => {

					return  selectAddress[item.id]
				
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
				
				this.selectAddress[id] = !this.selectAddress[id]
				
			},
			deleteItem (id) {

				const selectAddress = this.selectAddress
				const list = this.list

				for (let len = list.length, i = len - 1; i >=0; i--) {

					if (selectAddress[list[i].id]) {
						
						this.list.splice(i,1)

					}

				}

			}
		},

		created (){

			this.updatePageView(false)

			let selectAddress = {}
			
			this.list.forEach((item) => {

				selectAddress[item.id] = false
				
			})
			
			this.selectAddress = selectAddress
			
			this.$showLoading()

			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()

			},300)

		}

	}

</script>

<style lang="scss">
	
	@import '../../../styles/header_tit.scss';
	
	.select_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
	}
	
	
	.select_address_add{
		
		padding: .7rem 0;
		
		display: flex;
		
		align-items: center;
		
		flex-direction: column;
		
		.icon-jia{
			
			width: .9rem;
			height: .9rem;
			
			color: #cecece;
			
		}
		
		span{
			
			font-size: .32rem;
			
			color: #9d9d9d;
			
			padding-top: .2rem;
			
		}
		
	}
	
	.select_address_edit{
		
		width:.7rem;
		
		height: 1.46rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		margin-left: .15rem;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.select_address_item{
		
		height: 1.46rem;
		
		padding-right:.22rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}
	
	.select_address_info{
		
		
		p{
			
			color: #9d9d9d;
			
		}
	}
	
	.address_edit{
		
		width:.7rem;
		
		height: .8rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.address_txt{
		
		display: flex;
		
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
		align-items: center;
		
		strong{
			
			padding-left: .3rem;
			
		}
		
	}
	
	
	.address_info{
		
		p{
			
			color: #9d9d9d;
		}
	}
	
	.address_item{
		
		height: 1.46rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}

</style>
