
var validate = {
	/**
	 * @param {string} phone
	 * @return {boolean}
	 */
	isMobile (text) {

		var pattern = /^1[3-8]\d{9}$/;

		return pattern.test(text);

	},

	/**
     * @param {string} phone
     * @return {boolean}
     */

	isTelephone (text) {

	  var  pattern = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

	  return pattern.test(text)

	},

	/**
	 * @param {string} zipCode
	 * @returns {boolean}
	 * @example
	 * Lizard.isZipCode('430406')
	 */
	isZipCode (text){

		var pattern = /^[0-9]{6}$/;

		return pattern.test(text);
	},

    isMessageCode (text){

        var pattern = /^[0-9]{6}$/;

        return pattern.test(text);
    },

	/**
	 *
	 * @param {string} text
	 * @returns {boolean}
	 */

	isNumber (text) {

		var pattern = /^[1-9]\d{0,8}$/;

		return pattern.test(text);

	},

	/**
	 * @param {Number || String} text
	 * @returns {boolean}
	 */

	checkNumber: function (text) {

		var pattern = /^[0-9]+.?[0-9]*$/;

		return pattern.test(text);

	},
	/**
	 * 验证是否为真实姓名，中英文和数字，中文算两个，长度不超过20
	 * @param {string} name 姓名
	 * @return {boolean}
	 * @example
	 * validate.isName('张三')
	 */
	isName: function (text) {

		var pattern = /^([\u4e00-\u9fa5]|[A-Za-z_])+$/;

		if (pattern.test(text)) {

			text = text.replace(/[\u4e00-\u9fa5]/g, '__');

			return text.length <= 20;

		} else {

			return false;

		}
	},
	/**
	 * 验证是否为身份证号码
	 * @param {string} card 身份证号码
	 * @return {boolean}
	 * @example
	 * validate.isIdCard('513030198908230234')
	 */
	isIdCard: function(text) {
		//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
		var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

		return pattern.test(text);

	}

}

export default validate