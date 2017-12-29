
import * as userAPI from '@/api/user'

import store from '@/widget/store'
	/**
	 * 获取用户的信息
	 */
export const	getUserInfo = () => {
		userAPI.getUserInfo({
			type: 'GET'
		}).then((res) => {

			const data = res.data

			if (data && res.status >=1) {

				const times  = new Date().getTime() + 1.8 * 60 * 60 * 1000

				store.set('LEIDI_USER_INFO',{
					userInfo:data,
					times
				})

			}else if (data && res.status == -3001) {

				wxOauthLogin()

			} else{

				this.$toast(res.msg)

			}
		})
	}
	/**
	 *
	 * 用户认证
	 */
export const wxOauthLogin = () => {

	const pathname = location.pathname + location.search

	userAPI.wxOauthLogin({
		type: 'GET',
		data: {
			refer_url: pathname
		}
	}).then((res) => {

		const data = res.data

		if (data && res.status >=1) {
			const times  = new Date().getTime() + 1.8 * 60 * 60 * 1000

			store.set('LEIDI_IS_LOGIN',{
				isLogin: true,
				times
			})

			console.log(data.url)

			window.location.href = data.url

		} else {

			this.$toast(res.msg)

		}

	})
}

export const wxUserAuth = () =>{

	const isLogin = store.get('LEIDI_IS_LOGIN')

	const userInfo = store.get('LEIDI_USER_INFO')

	if (isLogin) {

		const time = isLogin.times

		if (new Date().getTime() > time) {

			wxOauthLogin()

		} else {

			if (!userInfo) {

				getUserInfo()

			}
		}

	} else {

		wxOauthLogin()

	}
}
