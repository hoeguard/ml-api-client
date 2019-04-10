<template lang="pug">
v-container(grid-list-md text-xs-center)
	v-layout(row wrap)
		v-flex(xs12)
			v-card
				v-card-title.headline Welcome {{ profile.first_name }} {{ profile.last_name }}!
			v-card
				.uniform
					img#input.image.pa-2(
						src="/puppy.jpg"
					)
				.uniform
					img#preview.image.pa-2(
						src="/udnie.jpg"
					)
				.uniform
					img#output.image.pa-2(
						v-if="src"
						:src="src"
					)
			v-card-actions
				v-spacer
				v-btn(
					flat
					@click="serverStyleTransfer"
				) Server Transfer
				v-btn(
					flat
					@click="clientStyleTransfer"
				) Client Transfer
</template>

<script>
import { mapState } from 'vuex'
import ml5 from 'ml5'
import api from '~/api'

export default {
	data() {
		return {
			style: undefined,
			src: undefined
		}
	},
	computed: {
		...mapState('user', [
			'profile'
		]),
	},
	mounted() {
		this.style = ml5.styleTransfer('/models/2', () => {
			console.log('model loaded')
		})
	},
	methods: {
		clientStyleTransfer() {
			let image

			if (this.src) image = document.getElementById('output')
			else image = document.getElementById('input')
	
			this.style.transfer(image, (err, result) => {
				this.src = result.src
			})
		},
		async serverStyleTransfer() {
			let params = {
				image: undefined,
				model_id: 1
			}

			let [err, res] = await api.styleTransfer(params)
				
			if (!err) console.log(res)
			else console.log(err)
		}
		// https://github.com/ml5js/training-styletransfer
	}
}
</script>

<style lang="styl">
.uniform {
	width: 30%;
	padding-top: 30%;
	position: relative;
	display: inline-block;
}
.image {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
</style>
