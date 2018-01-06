
import * as userAPI from '@/api/user'

import store from '@/widget/store'

/**
 *
 * 用户认证
 */
export const wxOauthLogin = () => {

	const isAuthLogin = store.get('LEIDI_IS_AUTH_LOGIN')

	if (isAuthLogin) {

		return
	}

	store.set('LEIDI_IS_AUTH_LOGIN',true)

	const pathname = location.pathname + location.search

	userAPI.wxOauthLogin({
		type: 'GET',
		data: {
			refer_url: pathname
		}
	}).then((res) => {

		const data = res.data

		if (data && res.status >=1) {

			store.remove('LEIDI_IS_AUTH_LOGIN')

			window.location.href = data.url

		}

	})
}
