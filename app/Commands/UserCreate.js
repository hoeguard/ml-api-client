'use strict'

const { Command } = use('@adonisjs/ace')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const PasswordGenerator = use('password-generator')
const to = use('App/Utilities/To')
const Database = use('Database')

class UserCreate extends Command {
	static get signature() {
		return `user:create`
	}

	static get description() {
		return `Creates a randomized user account that a developer can utilize to authenticate with this app and obtain the data it provides`
	}

	async handle() {
		this.info('Generating new user')

		let email = await this.ask('Enter email, or leave blank to randomly generate')
		let password = await this.ask('Enter password, or leave blank to randomly generate')

		if (!email) {
			email = `${PasswordGenerator(5, false)}@${PasswordGenerator(7, false)}.com`
		}

		if (!password) {
			const length = Math.floor(Math.random() * (26 - 19) + 19)
			password = PasswordGenerator(length, false)
		}

		const user = new User()

		user.email = email
		user.password = password

		let [userErr] = await to(user.save())

		if (userErr) {
			this.error(`${this.icon('error')} Error occurred while generating user`)
			this.error(userErr)
			Database.close()
			return
		}

		this.success(`${this.icon('success')} User Generated`)

		let generate_profile = await this.confirm('Generate profile for user?')
		if (generate_profile) {
			let username = await this.ask('Enter username, or leave blank to randomly generate')
			let first_name = await this.ask('Enter first name, or leave blank to randomly generate')
			let last_name = await this.ask('Enter last name, or leave blank to randomly generate')

			if (!username) {
			  username = `Anonymous_${PasswordGenerator(9, false)}`
			}
			if (!first_name) {
			  first_name = `First`
			}
			if (!last_name) {
			  last_name = `Last`
			}
		
			const profile = new Profile()

			profile.user_id = user.id
			profile.username = username
			profile.first_name = first_name
			profile.last_name = last_name

			let [profileErr] = await to(profile.save())

			if (profileErr) {
				this.error(`${this.icon('error')} Error occurred while generating profile`)
				this.error(profileErr)
				Database.close()
				return
			}
		}

		this.table(
			['email', 'password'],
			[
				[email, password]
			],
		)

		Database.close()
	}
}

module.exports = UserCreate
