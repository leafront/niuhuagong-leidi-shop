import utils from './utils'

/**
 *
 * @param {Object} optionsAjax
 * arguments
 * type:'GET',
 * timeout: 3000,
 * headers:{
	 *  Content-Type:'application/json'
	 * },
 * data:{
	 *  name:'leafront'
	 * }
 *
 * @returns {Promise}
 */

export default function ajax (optionsAjax){


	var options = Object.assign({},optionsAjax);

	var ajax = new Promise((resolve, reject) => {

		var xhr = new XMLHttpRequest();

		var data = options.data;

		data = utils.queryStringify(data);

		if (options.type == "GET") {

			options.url =  options.data ?  options.url + '?' + data: options.url;

		}

		xhr.open(options.type, options.url, options.async);

		xhr.timeout = options.timeout;

		//设置请求头
		for (var k in options.headers) {

			xhr.setRequestHeader(k, options.headers[k]);
		}

		xhr.responseType = options.dataType;

		xhr.onreadystatechange = () => {

			if(xhr.readyState == 4){

				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

					resolve(xhr.response);

				} else {

					reject(xhr.response);

				}
			}

		}

		options.type == "GET" ? xhr.send(null) : 	xhr.send(data);

	})

	return ajax;

}