<template lang="pug">
v-container
	v-layout
		v-flex
			v-card
				v-card-text
					v-form(
						ref="form"
						lazy-validation
						v-model="valid"
						@submit="loginAttempt"
					)
						v-text-field(
							name="email"
							label="Email"
							hint="(Your email)"
							tabindex="1"
							v-model="email"
							required
						)
						v-text-field(
							name="password"
							label="Password"
							type="password"
							tabindex="2"
							v-model="password"
							required
						)

					v-btn(
						tabindex="3"
						:disabled="valid === false"
						@click="loginAttempt"
					) Submit
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data () {
		return {
			valid: true,
			email: '',
			password: ''
		}
	},
	methods: {
		...mapActions('user', [
			'login'
		]),
		loginAttempt() {
			if (this.$refs.form.validate()) {
				this.login({
					email: this.email,
					password: this.password,
				})
			}
		}
	},
}
</script>
