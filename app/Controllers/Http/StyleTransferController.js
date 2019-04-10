'use strict'

const StyleModel = use('App/Models/StyleModel')

const to = use('App/Utilities/To')
const commonResponse = use('App/Utilities/CommonResponse')

// const Drive = use('Drive')
const ml5 = use('ml5')

class StlyeTransferController {
	// --- Response Methods --- \\

	// POST: /stlyetransfer
	async index ({ request, response }) {
		let [err, data] = await this._styletransfer(request.all())
		commonResponse(response, err, data)
	}

	async _styletransfer ({ input, model_id = 1 }) {
		// await Drive.put('hello.txt', 'test')
		let [err, styleModel] = await to(StyleModel.findOrFail(model_id))
		if (err) return [err]
		else return [null, { res: 'test'}]
	}
}

module.exports = StlyeTransferController