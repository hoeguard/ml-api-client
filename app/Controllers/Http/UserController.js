'use strict'

const commonResponse = use('App/Utilities/CommonResponse')

// Internal non-response methods
const {
	_create,
	_read,
	_read_users,
	_update,
	_delete
} = use('App/Controllers/Helpers/User')

class UserController {
	// --- Response Methods --- \\

	// POST: /user/create
	async create ({ request, response }) {
		let [err, data] = await _create(request.all())
		commonResponse(response, err, data)
	}

	// POST: /user/read
	async read ({ auth, response }) {
		let [err, data] = await _read({ auth })
		commonResponse(response, err, data)
	}

	// POST: /user/read
	async read_users ({ auth, response, request }) {
		let [err, data] = await _read_users(request.all())
		commonResponse(response, err, data)
	}

	// POST: /user/update
	async update ({ request, response }) {
		let [err, data] = await _update({ auth }, request.all())
		commonResponse(response, err, data)
	}

	// POST: /user/delete
	async delete ({ request, response }) {
		let [err, data] = await _delete(request.all())
		commonResponse(response, err, data)
	}
}

module.exports = UserController