'use strict'

const commonResponse = use('App/Utilities/CommonResponse')

// Internal non-response methods
const {
	_auth,
	_check,
	_login
} = use('App/Controllers/Helpers/Auth')

class AuthController {
	// --- Response Methods --- \\

	// POST: /auth
	async auth ({ response, auth }) {
		let [err] = await _auth({ auth })
		commonResponse(response, err)
	}
	
	// POST: /auth/check
	async check ({ request, response, auth }) {
		let [err] = await _check({ auth }, request.all())
		commonResponse(response, err)
	}

	// POST: /auth/login
	async login ({ request, response, auth }) {
		let [err, token] = await _login({ auth }, request.all())
		commonResponse(response, err, token)
	}	
}

module.exports = AuthController