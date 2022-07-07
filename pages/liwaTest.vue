<script setup lang="ts">
	/*********************************************************
	prog name: 測試網頁, author: James Lin, date: 2020/04/19
	主功能: 

	**********************************************************/
	import { ref, onMounted } from "vue"
	import { createInput } from "@formkit/vue"
	import CurrencyInput from "../components/CurrencyInput"
	import liwaCombo from "../components/liwaCombo"

	const btnTest2 = ref(null)

	const values = ref({})
	
	const sVal1 = ref('A03')
	const arrOption = ref([{value:'A01'}, {value:'A02'}, {value:'A03'}, {value:'A04'}])

	const returnChange = (sItem) => {
		console.log('sItem =', sItem)
	}

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

	<FormKit 
		type="form"
		form-class="ml-4 relative w-72"	
		v-model="values" 
	>
		<FormKit
			type="liwaDrop"
			inner-class="border-0 rounded-none"
			outer-class="border-b-2 border-b-slate-500"
			label="下拉選單"
			name="Dropdown"
			help="下拉選單測試"
			:sVal="sVal1"
			:arrOption="arrOption"
		/>
	</FormKit>

	<liwaCombo class="w-24 h-8 ml-4 my-8"
		
		@returnChange="returnChange"
	/>
	<hr />
	<pre wrap>{{ values }}</pre>
</template>

<style>
	
</style>