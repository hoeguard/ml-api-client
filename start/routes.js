'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.post('/auth', 'AuthController.auth')
Route.post('/auth/login', 'AuthController.login')

Route.group(() => {
	Route.post('/create', 'UserController.create')
	Route.post('/read', 'UserController.read')
	Route.post('/update', 'UserController.update')
	// Route.post('/delete', 'UserController.delete')
})
.prefix('/user')
.middleware(['auth'])


Route.any('*', 'NuxtController.render')
