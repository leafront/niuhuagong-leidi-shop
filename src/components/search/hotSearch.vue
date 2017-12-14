<template>
	<div class="hot_search">
		<div class="hot_search_tit">
			<h4>热门搜索</h4>
		</div>
		<ul class="search_hot_list clearfix">
			<li>
				<span>水果</span>
			</li>
			<li>
				<span>洗发水</span>
			</li>
			<li>
				<span>围巾</span>
			</li>
			<li>
				<span>电动牙刷</span>
			</li>
			<li>
				<span>点卡</span>
			</li>
			<li>
				<span>纤维素醚</span>
			</li>
		</ul>
	</div>
</template>


<style lang="scss">

	.hot_search_tit{
		
		height: .94rem;
		
		display: flex;
		
		align-items: center;
		
		h4{
			
			color: #666;
			
			font-size: .28rem;
			
		}
		
	}
	.hot_search{
		
		padding: 0 .3rem;
		
		width:100%;
		
		overflow:hidden;
	}
	
	.search_hot_list{
		
		li{
			
			float:left;
			
			padding: 0 .2rem;
			
			height: .48rem;
			
			line-height: .48rem;
			
			text-align:center;
			
			margin-right:.2rem;
			
			color: #333;
			
			border:.02rem solid #dcdcdc;
			
			border-radius: .1rem;
			
			margin-bottom: .22rem;
			
		}
		
	}
	
</style>