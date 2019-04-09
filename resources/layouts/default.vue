<template lang="pug">
v-app(dark)
	v-navigation-drawer(
		app floating right
		v-model="drawer"
	)
		v-list.py-1
			v-list-tile(
				v-for="item in items"
				avatar 
				:key="item.to"
				:to="item.to"
				:disabled="item.disabled"
			)
				v-list-tile-avatar
					v-list-tile-action
						v-icon {{ item.icon }}
				v-list-tile-content
					v-list-tile-title {{ item.title }}
			v-list-tile(avatar @click="logoutClick")
				v-list-tile-avatar
					v-list-tile-action
						v-icon exit_to_app
				v-list-tile-content
					v-list-tile-title Logout
	v-toolbar(app)
		v-toolbar-title(class="white--text") Client
		v-spacer
		v-toolbar-side-icon(
			class="white--text"
			@click="drawer = !drawer"
		)
	v-content(app)
		nuxt
	v-footer(
		app
	)
		span &copy; 2019
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			clipped: false,
			drawer: false,
			items: [
				{
					icon: 'apps',
					title: 'Welcome',
					disabled: false,
					to: '/'
				}
			],
			miniVariant: false,
			title: 'Vuetify.js'
		}
	},
	beforeMount() {
		this.auth()
	},
	methods: {
		...mapActions('user', [
			'auth',
			'logout'
		]),
		logoutClick () {
			this.logout()
		},
	}
}
</script>
