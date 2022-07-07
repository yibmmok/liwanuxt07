<script setup lang="ts">
import { ref } from "vue"
import TinyMceEditor from "@tinymce/tinymce-vue"

	const imgInput = ref(null)
	const InitVal = ref({
		height: 500,
		language:"zh_TW",
		menubar: true,
		content_style:"../assets/css/tinyMCE.css",
	    plugins: [
	    	'emoticons', 'fullscreen', 'lists', 'link', 'image', 'help', 'wordcount'
	    ],
	    fullscreen_native: true,
	    toolbar: 'fullscreen | undo redo | blocks |  forecolor backcolor | indent outdent | emoticons | link image | bold italic | help',
	    file_picker_callback: function(callback, value, meta) {
		  	if (meta.filetype == 'image') {
		  // 		const imgInput = document.createElement('input')
				// imgInput.setAttribute('type', 'file');
				// imgInput.setAttribute('accept', 'image/*');
				imgInput.value.addEventListener('change', (e) => {
					const file = e.target.files[0]
					const reader = new FileReader()
					reader.onload = (e) => {
						callback(e.target.result, { alt: ''})
					}
					reader.readAsDataURL(file)
				})
				imgInput.value.click()
			}
		},
	})

	const handleOnChange = () => {
		console.log("The input has changed!")
	}
</script>

<template>
<h1 class="text-red-500 text-3xl p-4">Index Page</h1>
<div>
	<TinyMceEditor api-key="fkoaqldrjeuygn6wbe51uchydhzrhufgs8a9tt6yehn106uo" 
	:init="InitVal"
	@change="handleOnChange"/>
</div>
<div class="invisible">
	<input 
		id="imgInput" 
		ref="imgInput" 
		class="w-11/12 h-8 bg-grey-100 hidden" 
		type="file" 
		accept="image/*" 
	/>		
</div>
</template>
