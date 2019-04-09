'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
	up () {
		this.create('users', table => {
			table.increments()
			table.string('email', 191).notNullable().unique()
			table.string('password', 60).notNullable()
			table.boolean('reset').notNullable().defaultTo(false)
			table.boolean('deleted').notNullable().defaultTo(false)
			table.timestamps()
		})
	}

	down () {
		this.drop('users')
	}
}

module.exports = UserSchema
