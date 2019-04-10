'use strict'

const Env = use('Env')
const { Command } = use('@adonisjs/ace')
const { Builder } = require('nuxt')

class NuxtBuild extends Command {
	/**
   * signature defines the requirements and name
   * of command.
   *
   * @return {String}
   */
	static get signature() {
		return 'nuxtbuild'
	}

	/**
   * description is the little helpful information displayed
   * on the console.
   *
   * @return {String}
   */
	static get description() {
		return 'Build for production the nuxt.js application.'
	}

	/**
   * handle method is invoked automatically by ace, once your
   * command has been executed.
   *
   * @param  {Object} args    [description]
   * @param  {Object} options [description]
   */
	async handle(args, options) {
		if (Env.get('NUXT_RENDER', true)) {
			const nuxt = use('Service/Nuxt')
			this.info('Building nuxt.js application...')
			await new Builder(nuxt).build()
		} else {
			return false
		}
	}
}

module.exports = NuxtBuild
