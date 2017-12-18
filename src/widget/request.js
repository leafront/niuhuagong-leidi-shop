import ajax from './ajax'

import store from './store'

import utils from './utils'

function 	clearAjax () {

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

		var defaultOptions = {
			isHeader:true,
			type: options.type,
			data: options.data,
			async: true,
			url:url,
			timeout: 6000,
			dataType:'json',
			headers: {
				"Content-type":"application/x-www-form-urlencoded",
				"Accept": 'application/json'
			}
		}

		
		const cache = options.cache || false
		
		const expires = options.expires || 60 * 60 * 1000

	  clearAjax()

		var resAjax = new Promise((resolve, reject) => {

			let currentTime = new Date().getTime()

			if (cache && store.get(url)) {

				const getCacheTime = store.get(url).times

				if (currentTime < getCacheTime) {

					resolve(store.get(url).results)

				} else {

					store.remove(url)

					ajax(defaultOptions).then((results) => {

						let res = {
							times: new Date().getTime() + expires,
							results
						}

						store.set(url, res)

						resolve(results)

					})
				}

			} else {

				ajax(defaultOptions).then((results) => {

					let res = {
						times: new Date().getTime() + expires,
						results
					}

					if (results) {

						store.set(url, res)

					}

					resolve(results)

				})

			}
		})

		return resAjax

}