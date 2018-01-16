
import * as Model from '@/model/common'

const wx_pay = {

	/**
	 * 获取微信支付配置参数去支付
	 * @param {String} orderId
	 *
	 */
	payInfo (orderId) {

		this.$showLoading()

		Model.getPayInfo({
			type: 'GET',
			data: {
				order_id: orderId
			}
		}).then((res) => {

			this.$hideLoading()

			const data = res.data

			if (data && res.status >=1 ) {

				wx_pay.wxBridgePay.call(this,data.jsApiParameters,orderId,data.order_id)

			} else {

				this.$toast(res.msg)

			}

		}).catch(() => {

			this.$hideLoading()

			this.$toast('网络服务器错误')

		})

	},

	/**
	 * 检查支付API是否成功支付
	 *  @param {String} orderCode
	 */

	checkPayInfo (orderCode) {

		Model.checkPayInfo({
			type: 'POST',
			data: {
				order_id: orderCode
			}
		})
	},

	/**
	 * 调起微信支付
	 * @param {Object} jsApiParameters
	 * @param {String} orderId
	 * @param {String} orderCode
	 */
	wxBridgePay (jsApiParameters,orderId,orderCode) {

		const onBridgeReady = () =>{
			WeixinJSBridge.invoke('getBrandWCPayRequest',
				jsApiParameters, (res) => {

					if (res.err_msg == "get_brand_wcpay_request:ok") {

						this.$toast('支付成功')

						wx_pay.checkPayInfo(orderCode)

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

