<template>
	<div>
		<div class="weui-picker" :class="{'active': isCityPicker}">
			<div class = "weui-picker__hd">
				<span class="weui-picker__action" @click="cancel">取消</span>
				<span class="weui-picker__action" @click="confirm">确定</span>
			</div>
			<div class = "weui-picker__bd">
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in province" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in city" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in area" :key="i">{{item}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div></div>
		</div>
		<div class="weui-mask" :class="{'active':isCityPicker}"></div>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex'

	import IScroll from '@/lib/IScroll'

	import areaCity from '@/data/areaCity'

	export default {

		data () {

			return {
				num: 3,
				selectCity: [8,0,0],
				province: areaCity,
				scroll: []
			}

		},

		computed: {

			...mapGetters({
				'isCityPicker': 'getIsCityPicker'
			}),
			city () {

				return  this.province[this.selectCity[0]].city

			},
			area () {

				return this.city[this.selectCity[1]].area

			}

		},

		created () {



		},

		methods: {

			...mapActions([
				'updateSelectCity',
				'updateIsCityPicker',
				'updateIsOverlayVisible'
			]),

			cancel () {
				
				this.$emit('hideCityPicker')
				

			},

			confirm () {

				const province = areaCity[this.selectCity[0]].name;
				const city = areaCity[this.selectCity[0]].city[this.selectCity[1]].name;
				const area = areaCity[this.selectCity[0]].city[this.selectCity[1]].area[this.selectCity[2]];
				const value = province + city + area;

				this.$emit('showCityPicker',value)

			},
			scrollList () {

				var This = this;

				var itemHeight = document.querySelector('.weui-picker__item').offsetHeight;

				var len = 3;

				Array.from(document.querySelectorAll('.weui-picker__group')).forEach((item,idx) => {

					var iscroll = new IScroll(item, {
						scrollX: false
					})

					this.scroll.push(iscroll)

					iscroll.on('scrollEnd', function () {


						var result = ( -this.y / itemHeight);

						var index = parseInt(result, 10);

						var diff = result - index;

						if (diff > 0.5) index ++;


						This.selectCity.splice(idx,1,index);

						if (idx == 0) {

							This.selectCity = [index, 0 , 0 ];

							for (var j = 1; j < len; j++) {

								This.scroll[j].scrollTo(0,0);

							}

						}

						for (var i = 1; i < len; i++) {


							This.scroll[i].refresh();

						}

						iscroll.scrollTo(0, -index * itemHeight);
					})
					iscroll.scrollTo(0, -This.selectCity[idx] * itemHeight);
				})
			}

		},

		mounted () {


			this.scrollList()

		}


	}


</script>
