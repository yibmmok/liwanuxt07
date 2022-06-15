<script setup lang="ts">
	const props = defineProps({
		context: Object,
	})

	const handleInput = (e) => {
		props.context.node.input(e.target.value)
	}
</script>

<template>
	<input @input="handleInput" :value="props.context._value" />
</template>