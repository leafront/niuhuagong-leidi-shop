import * as types from './mutation-types'

const state = {

	isMenu: false,
	overlayVisible: false,
	pageView: false,
	isOverlayVisible: 0,
	selectCityValue: {
		address: {},
		name:''
	},
	isCityPicker: false,
  scrollView: false,
	isLoading: false

}

const getters = {

	getIsMenu: state => state.isMenu,

	getOverlayVisible: state => state.overlayVisible,

	getPageView: state => state.pageView,

	getIsOverlayVisible: state => state.isOverlayVisible,

	getSelectCity: state => state.selectCityValue,

	getIsCityPicker: state => state.isCityPicker,
	getScrollView: state => state.scrollView

}

const actions = {

	updateIsMenu ( {commit}, info ){

		commit(types.UPDATE_IS_MENU, info)

	},
	updateOverlayVisible ({commit},info) {

		commit(types.UPDATE_OVERLAY_VISIBLE, info)

	},

	updatePageView ({commit}, info) {

		commit(types.UPDATE_PAGE_VIEW,info)

	},

	updateIsOverlayVisible ({commit},info) {

		commit(types.UPDATE_IS_OVERLAY_VISIBLE,info)

	},

	updateSelectCity ({commit}, info) {

		commit(types.UPDATE_SELECT_CITY,info)

	},

	updateIsCityPicker ({commit}, info) {

		commit(types.UPDATE_IS_CITY_PICKER,info)

	},
	updateScrollView ({commit}, info) {

		commit(types.UPDATE_SCROLL_VIEW, info)

	}

}

const mutations = {

	[types.UPDATE_IS_MENU] ( state, info ) {

		state.isMenu = info

	},

	[types.UPDATE_OVERLAY_VISIBLE] (state, info) {

		state.overlayVisible = info

	},

	[types.UPDATE_PAGE_VIEW] (state,info) {

		state.pageView = info

	},
	[types.UPDATE_IS_OVERLAY_VISIBLE] (state,info) {

		state.isOverlayVisible = info

	},
	[types.UPDATE_SELECT_CITY] (state,info) {

		state.selectCityValue = info

	},
	[types.UPDATE_IS_CITY_PICKER] (state,info) {

		state.isCityPicker = info

	},

	[types.UPDATE_SCROLL_VIEW] (state,info) {

		state.scrollView = info

	},

}

export default {
	state,
	getters,
	actions,
	mutations
}