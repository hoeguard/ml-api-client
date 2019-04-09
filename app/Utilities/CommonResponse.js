// This method was derived from the pattern noticed between all the responses.
// Turns out they either throw an error, return data, redirect or simply
// return a successful message. Since all non-response methods return the
// same return interface of [err, data], it was easy to provide a common
// response pattern.

const Logger = use('Logger')

function commonResponse(response, err, data, route) {
	if (err) {
		let message = 'Error Occurred'
		if (err.message) {
			message = err.message
		}
		Logger.warning(err)
		return response.status(401).send(message)
	}

	if (data) return response.send(data)
	if (route) return response.route(route)
	return response.status(202).send('Successful')
}

module.exports = commonResponse
