
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
				order_id: orderId
			}
		}).then((res) => {

			this.$hideLoading()

			const data = res.data

			if (data && res.status >=1 ) {

				wx_pay.wxBridgePay.call(this,data.jsApiParameters,orderId)

			} else {

				this.$toast(res.msg)

			}

		}).catch(() => {

			this.$hideLoading()

			this.$toast('网络服务器错误')

		})

	},

	/**
	 * 调起微信支付
	 * @param {Object} result
	 */
	wxBridgePay (jsApiParameters,orderId) {

		const onBridgeReady = () =>{
			WeixinJSBridge.invoke('getBrandWCPayRequest',
				jsApiParameters, (res) => {

					if (res.err_msg == "get_brand_wcpay_request:ok") {

						this.$toast('支付成功')

						window.location.href = `/order/detail?id=${orderId}`

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

