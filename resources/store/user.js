import api from '~/api'

export const state = () => ({
	jwt: localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : undefined,
	authenticated: false,
	user: {},
	profile: {},
	memberships: []
})

export const mutations = {
	authenticate(state) {
		state.authenticated = true
	},
	deauthenticate(state) {
		state.authenticated = false
		this.$router.push('/login')
	},
	setUser(state, user = {}) {
		state.user = user
		state.profile = user.profile || {}
		state.memberships = user.memberships || []
	},
	unsetUser(state) {
		state.user = {}
		state.profile = {}
		state.memberships = []
	},
	setJWT(state, jwt = undefined) {
		let token = undefined
		
		if (jwt) {
			state.jwt = jwt
			localStorage.setItem('jwt', JSON.stringify(jwt))
			
			token = jwt.token
		} else if (state.jwt && state.jwt.token) {
			token = state.jwt.token
		}
		
		if (token) api.setAuthorizationBearer(token)
	},
	unsetJWT(state) {
		localStorage.removeItem('jwt')
		state.jwt = undefined
		
		api.unsetAuthorizationBearer()
	},
}

export const actions = {
	async auth({
		commit,
		dispatch
	}) {
		let jwt = localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : undefined
		if (!jwt || !jwt.token) {
			commit('deauthenticate')
			return
		}
		
		let AuthorizationBearer = api.getAuthorizationBearer()
		if (!AuthorizationBearer || !AuthorizationBearer.includes(jwt.token)) {
			api.setAuthorizationBearer(jwt.token)
			let [err] = await api.auth()
			if (!err) {
				commit('authenticate')
				await dispatch('read_user')
			} else {
				commit('unsetJWT')
				commit('deauthenticate')
				console.log(err)
			}
		}
	},
	
	async login({
		commit,
		dispatch
	}, {
		email,
		password
	}) {
		let [err, res] = await api.login({
			email,
			password
		})
		if (!err) {
			let {
				data: token
			} = res
			commit('setJWT', token)
			commit('authenticate')
			this.$router.push('/')
			await dispatch('read_user')
		} else {
			commit('unsetJWT')
			commit('deauthenticate')
			console.log(err)
		}
	},
	
	async read_user({
		commit
	}) {
		let [err, user] = await api.user_read()
		if (!err && user.data) {
			commit('setUser', user.data)
		} else {
			console.log(err)
		}
	},
	
	async logout({
		commit
	}) {
		commit('unsetJWT')
		commit('deauthenticate')
		return
	}
}