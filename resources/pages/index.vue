<template lang="pug">
v-container(grid-list-md text-xs-center)
	v-layout(row wrap)
		v-flex(xs12)
			v-card
				v-card-title.headline Welcome {{ profile.first_name }} {{ profile.last_name }}!
			v-card-actions
				v-spacer
				v-btn(
					color="primary"
					flat
					nuxt
					to="/chat"
				) Chat
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('user', [
			'profile'
		]),
	},
}
</script>
