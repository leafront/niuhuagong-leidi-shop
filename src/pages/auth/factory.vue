<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="auth_factory">
				<div class="auth_title">
					<span>个人信息</span>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="真实姓名" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="身份证号码" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="手机号码" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="短信验证码" class="ui-form-input"/>
				</div>
				<div class="auth_title">
					<span>门店信息</span>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="门店类型" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="所在地区" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="具体地址" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="门店名称" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="门店联系电话" class="ui-form-input"/>
				</div>
				<div class="auth_title">
					<span>上传图片</span>
				</div>
				<div class="auth_upload">
					<div class="auth_upload_wrapper">
						<div class="auth_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
						</div>
						<p>营业执照(三证合一)</p>
					</div>
					<div class="auth_upload_wrapper">
						<div class="auth_upload_item">
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
		<div class="ui-submit-button white-view">
			<span class="submit_button">确认</span>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'

	import * as API from '@/api/invoice'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				title: '合作伙伴认证',
				params:{
					name:'',
					idcard:'',
					mobile:'',
					smscode:'',
					img1:'',
					img2:'',
					guide_address:'',
					store_type:'',
					store_name:'',
					store_tel:'',
					province_name:'',
					province_id:2,
					city_name:'',
					city_id:'',
					area_name:'',
					area_id:501
				}
			}
		},

		methods: {

		},

		created (){

		}

	}
</script>

<style lang="scss">

  .auth_factory{
	  
	  padding: 0 .2rem;
	  
  }
  
  .auth_title{
	  
	  padding-top:.24rem;
	  
	  padding-left: .3rem;
	  
	  span{
		  
		  font-size: .28rem;
		  
		  color:#333
		  
	  }
	  
  }


  .auth_upload_wrapper{
	
	  p{
		
		  color: #9d9d9d;
		  
		  font-size: .28rem;
		
		  line-height: .6rem;
		
		  text-align: center;
		
	  }
	
  }

  .auth_upload{
	
	  margin-top: .24rem;
	
	  display: flex;
	  
	  padding-bottom: .3rem;
	
	  justify-content: space-between;
	
  }

  .auth_upload_item{
	
	  width: 3.38rem;
	
	  height: 1.95rem;
	
	  background: #f6f6f6;
	
	  display: flex;
	
	  align-items: center;
	
	  border-radius: .2rem;
	
	  justify-content: center;
	
	  position: relative;
	
	  .auth_upload_img{
		
		  width: 3.38rem;
		
		  height: 1.95rem;
		
		  position: absolute;
		
		  left:0;
		
		  top:0;
		  z-index:105;
		
	  }
	
	  .auth_upload_file{
		
		  width: 3.38rem;
		
		  height: 1.95rem;
		
		  position: absolute;
		
		  background: transparent;
		
		  left:0;
		
		  right:0;
		
		  opacity: 0;
		  z-index:100;
		
	  }
	
	  .ico-xiangji{
		
		  width: 1.2rem;
		
		  height: 1.2rem;
		
		  color: #cecece;
		
	  }
	
  }

</style>