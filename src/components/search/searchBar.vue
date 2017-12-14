<template>
	<div class="search">
		<div class="search_back" @click="pageAction">
			<svg class="ico back_ico" aria-hidden="true">
				<use xlink:href="#icon-jiantou-left"></use>
			</svg>
		</div>
		<div class="search_inputBar">
			<input type="search" class="search_input" v-model.trim="searchWord" :placeholder="defaultWord"/>
		</div>
		<div class="search_btn">
			<svg class="ico search_ico" aria-hidden="true">
				<use xlink:href="#icon-sousuo2"></use>
			</svg>
		</div>
	</div>
</template>


<script>
	
	export default {
		
		data () {
			
			return {
				
				defaultWord: '兰蔻粉水',
				
				searchWord:''
				
			}
			
		},
		
		methods: {

			pageAction () {
				
				this.$router.back()
				
			},

			delKeyword () {
				
				this.searchWord = ''
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.search{
		
		padding: .2rem 0;
		
		display: flex;
		
		border-bottom: .01rem solid #f1f1f1;
		
		align-items: center;
		
	}
	
	.search_inputBar{
		
		padding-left:.32rem;
		
		border-radius: .1rem;
		
		width: 76%;
		
		height: .6rem;
		
		background: #ededed;
		
		position: relative;
		
		.search_input{
			
			width: 100%;
			
			height:.6rem;
			
			padding: .2rem 0;
			
			color:#333;
			
		}
		
		.search_close_ico{
			
			color:#a2a2a2;
			width: .28rem;
			height: .28rem;
			
		}
		
	}
	
	.search_btn {
		
		width: 12%;
		
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		height: .6rem;
		
		
		.search_ico{
			
			width: .4rem;
			
			height: .4rem;
			
			color: #008aec;
			
		}
		
	}
	
	.search_back{
		
		width: 12%;
		
		display: flex;
		
		height: .6rem;
		
		justify-content: center;
		
		align-items: center;
		
		
		.back_ico{
			
			width: .5rem;
			
			height: .45rem;
			
			color: #c1c1c1;
			
		}
		
	}
</style>