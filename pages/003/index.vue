<script setup lang="ts">
	/*********************************************************
	prog name: 使用者列表, author: James Lin, date: 2020/04/19

	**********************************************************/
	import type { Ref } from "vue"
	import { ref, reactive, onMounted } from "vue"
	import { useFetch, useStorage, useTitle } from "@vueuse/core"
	import banner from "../../components/banner"

	const error = ref('')
	const liwaData = ref({})
	const progName = ref('使用者群組列表')
	const proglink = ref('/003')
	const detailFlg = ref(false)
	const detailName = ref('')
	const siteID = ref('')
	const mainID = ref('')
	const itemIcon = ref('')
	const arrChklist = ref([])

	const fetchData = async () => {
		siteID.value = window.sessionStorage.getItem('liwaSiteID')
		let APIsvr = window.sessionStorage.getItem('liwaAPIsvr')
		let url = `${APIsvr}/003_havelist.php?siteID=${siteID.value}`
		const data = await useFetch(url, {method: 'GET'}, {refetch: true}).get().json()
		liwaData.value = data.data.value.arrSQL
		console.log('liwaData =', liwaData.value)
	}

	const setMainID = (sID) => {
		let makerID = window.sessionStorage.getItem('liwaUserID');
		console.log('sID =', sID)
		if (sID !== makerID) window.location.href = `${proglink.value}/${sID}`
	}

	const toggleChecked = (idx) => {
		console.log('idx =', idx)
		let res = liwaData.value.filter((n) => n.uGroupID == idx)  // 待修
		console.log('res =', res)
		let iCheck = (res[0].isChecked == 1)? 0: 1
		res[0].isChecked = iCheck
		let iCount = 0
		// 若 iCheck == 1(代表已被選), 將 idx加入 arrChklist內, 否則從 arrChklist移除
		if (iCheck == 1) {
			arrChklist.value.push(idx)
			// 檢查是否已全選, 若是, isChkAllMode = 1
			iCount = 0
			arrChklist.value.forEach((n1) => {
				// 逐筆檢查, 若已全選, isChkAllMode = 1
				let res1 = liwaData.value.filter((m1) => m1.uGroupID == n1)
				// 若在liwaData內找到 iCount +1
				if (res1[0].length > 0) iCount += 1
			})
		} else {
			// unChecked
			let iIndex = arrChklist.value.indexOf(idx)
			arrChklist.value.splice(iIndex, 1)
			iCount = 0
			arrChklist.value.forEach((n2) => {
				// 逐筆檢查, 若非全選, isChkAllMode = 0
				let res2 = liwaData.value.filter((m2) => m2.mainID == n2)
				// 若在liwaData內找到 iCount +1
				if (res2[0].length > 0) iCount += 1
			})
		}		
	}

	onMounted(() => {
    	let compName = window.sessionStorage.getItem('liwaSiteName')
    	const title = useTitle(compName+`- 使用者群組列表`)
    	let imgsvr = window.sessionStorage.getItem('liwaImgsvr')
    	itemIcon.value = imgsvr + '/syspics/groups.png'
    	// 取得列表資料
		fetchData()
	})	

	definePageMeta({
	  title: 'LiwaSite 使用者群組管理',
	  layout: "default",
	})		
</script>

<template>
<banner
	:progname="progName"
	:proglink="proglink"
	:detailflg="detailFlg"
	:detailName="detailName"
></banner>
<div v-if="error">{{ error }}</div>
<div class="w-full bg-slate-200 px-4 py-2">
	<div class="barPanel h-12 rounded-3xl ml-4 mb-2 px-1">
		<div class="top-icon add ml-2 -mt-1" @click="setMainID('add')">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="#fee" viewBox="-1 -1 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke="#fee" stroke-linejoin="round" stroke-width="6" d="M12 4v16m8-8H4" />
			</svg>
		</div>
	</div>
	<div v-if="liwaData.length" class="mx-auto my-0 p-2 border-2 relative">
		<div class="w-full flex flex-col">
	    	<div class="w-[97%] sm:h-96 md:h-[36rem] lg:h-[42rem] min-h-full -my-2 overflow-x-hidden overflow-y-auto sm:-mx-6 lg:mx-8 bg-white">
	    		<div class="w-full flex flex-row justify-items-center">
					<div v-for="(uGroup, index) in liwaData" :key="index" :data-id="uGroup.uGroupID" 
						class="w-24 h-32 mx-2 my-1 bg-neutral-300 text-xl text-center rounded cursor-pointer flex flex-row justify-between relative"
						@click.prevent="setMainID(uGroup.uGroupID)">
						<div class="">
							<img :src="itemIcon" width="80" class="mt-4"/>
							<div class="w-full text-center ml-2">{{ uGroup.uGroupName }}</div>
							<div class="absolute w-6 h-6 top-1 left-1 border-2 border-slate-700" @click.prevent="toggleChecked(uGroup.uGroupID)">
								<div v-if="uGroup.isChecked=='1'" class="mt-1 ml-1">
									<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="-20 50 405.272 405.272" style="enable-background:new -20 50 405.272 405.272;"
										 xml:space="preserve">
										<g style="fill:#4338ca;stroke:#4338ca;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;">
											<path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
												c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
												c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"/>
										</g>
									</svg>
								</div>								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
</template>