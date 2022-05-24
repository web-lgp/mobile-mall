import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		path:"http://localhost:8080/file/",
		isLogin: '0',
		user: "",
		ser: null,
		token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
	},
	getters: { //监听数据变化
		getStorage(state) {
			if (!state.token) {
				state.token = JSON.prase(localStorage.getItem(key))
			}
			return state.token
		}
	},
	mutations: {
		$_setToken(state, value) {
			state.token = value;
			localStorage.setItem('token', value);
		},
		$_deleteStorage(state, value) {
			localStorage.removeItem('token');
		},
		setState(state, payload) {
			state[payload.key] = payload.value;
			console.log("setState", payload);
		},
	},
	actions: {
		setUserName(context, payload) {
			context.commit('setState', payload)
			console.log("setUserName", payload);
		},
	}
})
