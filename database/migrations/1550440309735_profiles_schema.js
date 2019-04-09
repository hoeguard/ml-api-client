'use strict'

const Schema = use('Schema')

class ProfilesSchema extends Schema {
	up () {
		this.create('profiles', (table) => {
			table.increments()
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.string('username', 191).notNullable().unique()
			table.string('first_name', 191)
			table.string('last_name', 191)
			table.boolean('deleted').notNullable().defaultTo(false)
			table.timestamps()
		})
	}

	down () {
		this.drop('profiles')
	}
}

module.exports = ProfilesSchema
