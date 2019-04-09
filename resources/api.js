import axios from 'axios'

const routes = {
	auth: '/auth',
	login: '/auth/login',
	user_read: '/user/read',
	memberships_read: '/memberships/read',
	users_read: '/users/read',
	room_messages_read: '/room/readMessages'
}

let api = {}

Object.entries(routes).forEach(([name, path]) => {
	api[name] = async (data) => {
		return await axios
			.post(path, data)
			.then(data => [null, data])
			.catch(err => [err])
	}
})

api.getAuthorizationBearer = token => {
	axios.defaults.headers.common['Authorization']
}

api.setAuthorizationBearer = token => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

api.unsetAuthorizationBearer = () => {
	axios.defaults.headers.common['Authorization'] = ''
}

export default api
