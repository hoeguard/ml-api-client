const User = use('App/Models/User')

const { _check } = use('App/Controllers/Helpers/Auth')

const to = use('App/Utilities/To')
const PasswordGenerator = use('password-generator')

const Helper = module.exports = {}

Helper._create = async function({ auth }, { email, password = false })
{	
	const user = new User()
	user.email = email

	if(!password) {
		const length = Math.floor(Math.random() * (26 - 19) + 19)
		password = PasswordGenerator(length, false)
		user.reset = true
	}

	user.password = password
	
	let [err] = await to(user.save())
	if (err) return [err]
	else return [null, user]
}

Helper._read = async function({ auth })
{
	let [err, user] = await to(User
		.query()
		.where('id', auth.user.id)
		.with('profile')
		.first()
	)
	if (err) return [err]
	else return [null, user.toJSON()]
}

Helper._read_users = async function({ page = 1, quantity = 10 })
{
	let [err, user] = await to(User
		.query()
		.with('profile')
		.paginate( page, quantity )
	)
	if (err) return [err]
	else return [null, user.toJSON()]
}

Helper._update = async function({ auth }, { id, email })
{
	let err, user
	[err, user] = await to(User.findOrFail(id))
	if (err) return [err]

	user.email = email

		[err] = await to(user.save())
	if (err) return [err]

		[err] = await to(_check({ auth }, user.id))
	if (err) return [err]
	else return [null, user.toJSON()]
}
