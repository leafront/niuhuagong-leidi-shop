
import * as API from '@/api/common'

const wx_pay = {

	/**
	 * 获取微信支付配置参数去支付
	 *
	 */
	payInfo (orderId) {

		this.$showLoading()

		API.getPayInfo({
			type: 'GET',
			data: {

			}
		}).then((res) => {

			this.$hideLoading()

			const data = res.data

			if (data && res.status >=1 ) {

				return data

			} else {

				this.$toast(res.msg)

			}

		}).then((res) => {

			wx_pay.wxBridgePay(res,orderId)

		}).catch(() => {

			this.$hideLoading()

			this.$toast('网络服务器错误')

		})

	},

	/**
	 * 调起微信支付
	 * @param {Object} result
	 */
	wxBridgePay (result,orderId) {

		const onBridgeReady = () =>{
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入
					"timeStamp": "1395712654",         //时间戳，自1970年以来的秒数
					"nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
					"package": "prepay_id=u802345jgfjsdfgsdg888",
					"signType": "MD5",         //微信签名方式：
					"paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
				}, (res) => {
					if (res.err_msg == "get_brand_wcpay_request:ok") {

						this.$toast('支付成功')

						this.pageAction(`/order/detail?id=${orderId}`)

					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {

						this.$toast('取消支付')

					} else if (res.err_msg == "get_brand_wcpay_request:fail") {

						this.$toast('支付失败')

					}
			})
		}

		if (typeof WeixinJSBridge == "undefined"){

			if( document.addEventListener ){

				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)

			}else if (document.attachEvent){

				document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
			}
		}else{

			onBridgeReady()
		}

	}
}

export default wx_pay

