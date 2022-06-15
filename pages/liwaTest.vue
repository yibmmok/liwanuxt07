<script setup lang="ts">
	/*********************************************************
	prog name: 測試網頁, author: James Lin, date: 2020/04/19
	主功能: 

	**********************************************************/
	import { ref, onMounted } from "vue"
	import { createInput } from "@formkit/vue"
	import OneTimePass from "../components/OneTimePass"
	// import { useShowmode } from "../composables/use-showmode"
	// import jwtDecode from "jwt-decode"
	// import { useFetch, createFetch } from "@vueuse/core"

	const btnTest2 = ref(null)

	const values = ref({})
	const otp = createInput(OneTimePass)


	definePageMeta({
	  title: 'LiwaSite 測試頁',
	})	
</script>

<template>
	<div>
		<h1>測試網頁</h1>
	</div>
	<div>
		<div 
			class="w-12 h-8 bg-slate-500 text-white text-center pt-1 ml-4 mt-2 cursor-pointer"
			@click="getResult1()"
			>測試</div>
		<div class="w-12 h-8 bg-purple-200 invisible" @click="" ref="btnTest2">btnTest2</div>	
	</div>
	<FormKit type="form" v-model="values">
		<FormKit
			:type="otp"
			form-class="p-2 bg-yellow-200"
			label="一次性密碼"
			name="two_factor_code"
			help="密碼已發送到您的手機"
			validation="required"
			validation-visibility="live"
		/>
	</FormKit>
	<pre wrap>{{ values }}</pre>
</template>

<style>
	
</style>