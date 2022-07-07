<script setup lang="ts">
	import { ref, onMounted } from "vue"

	const isShow = ref(false)
	const arrOption = ref(['abc', 'def', 'ghi', 'jkl'])

	const emits = defineEmits(["returnChange"])

	const showValue = ref('')

	// const handleInput = (e) => {
	// 	props.context.node.input(e.target.value)
	// }

	const toggleMenu = () => {
		isShow.value = !isShow.value
	}	

	const getItems = (sValue) => {
		showValue.value = sValue
		// props.context.node.input(sValue)
		isShow.value = false
		emits("returnChange", sValue)
	}


</script>

<template>
	<input 
		ref="inputVal"
		class="outline-0 text-md" 
		:value="showValue"
		readonly="readonly"
		@click="toggleMenu"
	/>
	<div v-if="isShow==true" 
		class="max-w-[10rem] w-full h-24 absolute top-12 left-0 text-md outline-1"
	>
		<ul >
			<li v-for="(item, index) in arrOption" 
				class="w-full h-8 border-b-2 border-b-slate-500 bg-slate-300 cursor-pointer"
				@click="getItems(item)"
			>{{ item }}
			</li>
		</ul>			
	</div>	
</template>