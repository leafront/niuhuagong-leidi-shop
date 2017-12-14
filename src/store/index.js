import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'

import detail from './detail'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		common,
		detail
	}
})