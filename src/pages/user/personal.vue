<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper white-view">
			<div class="personal">
				<div class="personal_form">
					<div class="personal_form_item">
						<label>昵称</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入昵称"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>姓名</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入姓名"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>职务</label>
						<div class="personal_input" @click="showMenu(0)">
							<span>请选择个人职务</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou-right"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>公司</label>
						<div class="personal_input" @click="showMenu(1)">
							<span>请输入公司名称</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou-right"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>行业</label>
						<div class="personal_input">
							<span>请选择公司所在行业</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou-right"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>类型</label>
						<div class="personal_input">
							<span>请选择公司所在行业</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou-right"></use>
							</svg>
						</div>
					</div>
					<SelectMenu :list="list" :index="0" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'job'" @selectMenu="selectMenu"/>
					<SelectMenu :list="list" :index="1" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'company'" @selectMenu="selectMenu"/>
					<div class="personal_button">
						<span class="submit_button">确认</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import SelectMenu from '@/components/widget/selectMenu'

	export default {
		
		components: {

			SelectMenu,
			AppHeader
			
		},
		
		data () {
			
			return {

				title: '个人资料',
				isMenu: [false,false],
				
				job:'',
				
				company: '',

				selectedId: [''],
				
				list: [{name:'北京',id:1},{name:'上海',id:2},{name:'广州',id:3},{name:'深圳',id:4},{name:'杭州',id:5},{name:'武汉',id:6}]
				
			}
			
		},

		beforeCreate () {

			document.title = '个人资料'

		},
		
		methods: {

			hideMenu (index) {
				
				this.isMenu.splice(index,1,false)
				
			},

			selectMenu (val,attr) {
				
				this[attr] = val
				
			},

			showMenu (index) {

				this.isMenu.splice(index,1,true)
				
			}
			
		}

	}

</script>

<style lang="scss">
	
	.personal{
		
		padding-top: .24rem;
		
		background: #f6f6f6;
		
		
	}
	
	.personal_button{
		
		span{
		
			background: #1ba0e5;
			
		}
		
	}
	
	.personal_form{
		
		padding: 0 .22rem;
		
		background: #fff;
		
	}
</style>
