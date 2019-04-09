'use strict'

const Model = use('Model')

class User extends Model {
	static boot() {
		super.boot()

		this.addHook('beforeSave', 'User.hashPassword')
	}

	static get hidden() {
		return ['password']
	}

	tokens() {
		return this.hasMany('App/Models/Token')
	}

	profile() {
		return this.hasOne('App/Models/Profile')
	}
}

module.exports = User
