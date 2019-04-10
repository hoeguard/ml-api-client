'use strict'

const Schema = use('Schema')

class StyleModelSchema extends Schema {
	up () {
		this.create('style_models', (table) => {
			table.increments()
			table.timestamps()
			table.string('label', 191).notNullable().unique()
			table.boolean('valid').notNullable().defaultTo(false)
			table.boolean('deleted').notNullable().defaultTo(false)
		})
	}
	
	down () {
		this.drop('style_models')
	}
}

module.exports = StyleModelSchema
