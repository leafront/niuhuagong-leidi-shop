import ajax from './ajax'

import store from './store'

import utils from './utils'

import { wxOauthLogin } from '@/widget/common'

/***
 *获取localStorage 过期缓存
 *
 */

function 	clearStorage () {

	var currentTime = new Date().getTime()

	if (utils.isLocalStorageSupported()) {

		for (var i = 0; i < localStorage.length; i++) {


			var key = localStorage.key(i);

			var cacheData = store.get(key)


			if (cacheData && cacheData.times) {

				if (currentTime > cacheData.times) {

					store.remove(key)

				}

			}

		}
	} else {

		if (window.name) {

			var storage = utils.deserialize(window.name)

			for (var attr in storage) {

				var cacheData = store.get(attr)

				if (cacheData && cacheData.times) {

					if (currentTime > cacheData.times) {

						store.remove(attr)

					}

				}
			}

		}

	}

}


export default function request (url,options){

		var defaultOpt = {
			isHeader:true,
			type: options.type,
			data: options.data,
			async: true,
			url:url,
			timeout: 6000,
			dataType: options.dataType || 'json',
			headers: {
				"Content-type":"application/x-www-form-urlencoded",
				"Accept": 'application/json'
			}
		}

		clearStorage()
		
		const cache = options.cache || false
		
		const expires = options.expires || 30 * 60 * 1000

		let data = options.data;

	  defaultOpt.data = utils.queryStringify(data);

		if (options.type == "GET") {

			defaultOpt.url =  defaultOpt.data ?  defaultOpt.url + '?' + defaultOpt.data: defaultOpt.url;

		}

		var resAjax = new Promise((resolve, reject) => {

			let currentTime = new Date().getTime()

			if (cache && store.get(defaultOpt.url)) {

				const getCacheTime = store.get(defaultOpt.url).times

				if (currentTime < getCacheTime) {

					resolve(store.get(defaultOpt.url).results)

				} else {

					store.remove(defaultOpt.url)

					ajax(defaultOpt).then((results) => {

						let res = {
							times: new Date().getTime() + expires,
							results
						}

						if (results.status >= 1)  {
							store.set(defaultOpt.url, res)
						}
						if (results.status == -3001) {

							wxOauthLogin()
							reject(results)

						}
						resolve(results)

					})
				}

			} else {

				ajax(defaultOpt).then((results) => {

					let res = {
						times: new Date().getTime() + expires,
						results
					}

					if (cache && results.status >= 1) {

						store.set(defaultOpt.url, res)
					}
					if (results.status == -3001) {

						wxOauthLogin()

					  reject(results)

					}

					resolve(results)

				})

			}
		})

		return resAjax

}