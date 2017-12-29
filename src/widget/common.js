
import * as userAPI from '@/api/user'

import store from '@/widget/store'

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

			window.location.href = data.url

		}

	})
}
