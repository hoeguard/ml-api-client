const to = use('App/Utilities/To')

const Helper = module.exports = {}

Helper._auth = async function({ auth })
{
	let [err] = await to(auth.check())
	if (err) return [err]
	else return [null]
}

Helper._check = async function({ auth }, { user_id = null })
{
	if (auth.user.id !== Number(user_id))
	{
		const err = {
			message: 'User ownership check failed.'
		}

		return [err]
	}
	return [null]
}

Helper._login = async function({ auth }, { email = '', password = '' })
{
	let [err, token] = await to(auth.attempt(email, password))
	if (err) return [Err]
	else return [null, token]
}
