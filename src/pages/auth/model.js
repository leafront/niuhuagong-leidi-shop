
import validate from '@/widget/validate'

import * as Model from '@/model/user'

export default {

	/**
	 * 倒计时
	 *
	 */

	countTime (){

		let time = 60

		this.codeTxt = time + '秒后重新获取'

		this.clickCode = true

		let timer = setInterval(() => {

			time--

			this.codeTxt = time+'秒后重新获取'

			if(time == 0) {

				this.clickCode = false

				this.codeTxt = '获取验证码'

				clearInterval(timer)

			}
		},1000)
	},

	/**
	 *
	 * 验证输入的验证码
	 *
	 */

	userVerifyCode () {

		const { mobile,smscode } = this.params

		Model.userVerifyCode({
			type: 'POST',
			data: {
				mobile,
				smscode,
			}
		}).then((res) => {

			this.$hideLoading()

			const data = res.data

			if (data && res.status >= 1) {

				this.submitAuth()

			} else {

				this.$toast('验证码错误')

			}

		}).catch((err) => {

			this.$toast('网络服务错误')

		})

	},
	/**
	 * 用户获取验证码
	 *
	 */

	userAuthSendMsg () {

		const mobile = this.params.mobile

		if (!mobile) {

			this.$toast('请输入手机号码')
			return

		}

		if (!validate.isMobile(mobile)) {

			this.$toast('请输入正确的手机号码')
			return

		}

		Model.userAuthSendMsg({
			type: 'POST',
			data: {
				mobile
			}
		}).then((res) => {

			const data = res.data

			if (data && res.status >= 1) {

				this.$toast('发送成功')

				this.countTime()

			} else {

				this.$toast('发送失败')

			}

		})

	}

}