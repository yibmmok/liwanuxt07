<script setup lang="ts">
	/*********************************************************
	prog name: 使用者群組明細CRUD, author: James Lin, date: 2020/06/08

	**********************************************************/	
	import { ref, onMounted, computed } from "vue"
	import { useFetch, createFetch, useTitle } from "@vueuse/core"
	import banner from "../../components/banner"
	import liwaMsg from "../../components/liwaMsg.vue"
	import liwaConfig from "../../components/liwaConfig.vue"

	const mainID = ref('')
	const progName = ref('使用者群組列表')
	const proglink = ref('/003')
	const detailFlg = ref(true)
	const detailName = ref('')
	const liwaData = ref({progName:'', iAuth:0})
	const liwaD1 = ref({})
	const liwaChild = ref({})
	const bEditBox = ref(0)
	const stitle = ref('')
	const submitted = ref(false)
	const liwaSel1 = ref(['A', 'B', 'C'])

	const loadData = async () => {
		let siteID = window.sessionStorage.getItem('liwaSiteID')
		let url = window.sessionStorage.getItem('liwaAPIsvr') + "/003_haveD1.php?siteID=" + siteID + '&uGroupID=' + mainID.value 
		const data = await useFetch(url, {method: 'GET'}, {refetch: true}).get().json()
		detailName.value = data.data.value.uGroupName
		liwaData.value = data.data.value.arrSQL
		liwaData.value.action = 'edit'
		liwaData.value.mainID = mainID.value
		liwaData.value.siteID = window.sessionStorage.getItem('liwaSiteID')
		liwaData.value.userID = window.sessionStorage.getItem('liwaUserID')
		liwaData.value.makerName = window.sessionStorage.getItem('liwaUserName')
		stitle.value = '使  用  者  群  組  - ' + detailName.value
	}

	const loadD1 = async () => {
		let siteID = window.sessionStorage.getItem('liwaSiteID')
		let url = window.sessionStorage.getItem('liwaAPIsvr') + "/003_haveUGprog.php?siteID=" + siteID
		const data = await useFetch(url, {method: 'GET'}, {refetch: true}).get().json()
		liwaD1.value = data.data.value.arrSQL[0]
		console.log('liwaD1 =', liwaD1.value)
	}

	const setProgID = (sID) => {
		let res = liwaData.value.filter((n) => n.LMID == sID)
		res[0].isShow = 1
		bEditBox.value = 1
		liwaChild.value.progName = res[0].progName
		liwaChild.value.iAuth = res[0].iAuth
		
		console.log('liwaChild =', liwaChild.value)
	}

	onMounted(() => {
    	let compName = window.sessionStorage.getItem('liwaSiteName')
    	const title = useTitle(compName+`- 使用者群組列表`)
    	const route = useRoute()
    	mainID.value = route.params.id
		// 設定載入的資料
		loadData()
		loadD1()
	})	

	definePageMeta({
	  title: 'LiwaSite 使用者群組管理',
	  layout: "default",
	})		
</script>

<template>
<banner
	v-if="detailName"
	:progname="progName"
	:proglink="proglink"
	:detailflg="detailFlg"
	:detailName="detailName"
></banner>
<div v-if="error">{{ error }}</div>
<div class="w-full bg-slate-300 px-4 py-2">
	<div class="barPanel h-12 rounded-3xl ml-4 mb-2 px-1 flex flex-row justify-between">
		<div class="w-1/3 h-12">
			<div class="top-icon add ml-2 -mt-1" @click="setMainID('add')">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="#fee" viewBox="-1 -1 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke="#fee" stroke-linejoin="round" stroke-width="6" d="M12 4v16m8-8H4" />
				</svg>
			</div>
		</div>
		<div class="w-1/3 h-12 text-center">{{ stitle }}</div>
		<div class="w-1/3 h-12"></div>
	</div>
	<div v-if="liwaData.length" class="w-full lg:max-w-4xl lg:mx-auto my-0 p-2 border-2 relative">
		<div class="barPanel w-full h-12 rounded-3xl mt-2 mb-2 px-1 flex flex-row justify-between">
			<div class="w-1/3 h-12">
				<div class="top-icon Dadd ml-2 -mt-1 mr-4 bg-white"
                 @click=""
            	>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="-1 -1 24 24">
						<g style="fill:#000;stroke:#000;stroke-width:6px;stroke-linecap:round;stroke-linejoin:round;">
							<path d="M12 4v16m8-8H4" />
						</g>
					</svg>            		
            	</div>
			</div>
			<div class="w-1/3 h-12 text-center">程式列表及設定</div>
			<div class="w-1/3 h-12"></div>
		</div>
		<div class="w-full flex flex-row">
			<div class="w-full sm:h-96 md:h-[36rem] lg:h-[44rem] min-h-full -my-2 overflow-auto sm:-mx-6 lg:-mx-2">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow border-b border-gray-500 bg-white">
						<table class="min-w-full divide-x divide-y divide-gray-200 bg-white">
							<thead class="bg-gray-50">
								<tr class="bg-emerald-300">
									<th scope="col" class="thPanel w-3/7">程式名稱</th>
									<th scope="col" class="thPanel w-2/7">自訂名稱</th>
									<th scope="col" class="thPanel w-2/7">權限</th>
								</tr>
							</thead>
							<tbody class="w-full bg-white ring-1 ring-gray-50">
								<tr 
									class="h-20 relative odd:bg-white even:bg-slate-200"
									v-for="(prog, index) in liwaData"
									:key="index"
									:data-id="prog.LMID"
									@click.prevent="setProgID(prog.LMID)"
								>
									<td scope="col" class="tdPanel w-3/7">{{ prog.progName }}</td>
									<td scope="col" class="tdPanel w-2/7">{{ prog.LMName }}</td>
									<td scope="col" class="tdPanel w-2/7">
										<div class="w-full h-full flex flex-row">
											<div class="w-3/4 pl-4">
												{{ prog.authLimit }}
											</div>
											<div class="w-1/4 pl-4 relative" @click="">
												<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 458.5 458.5" style="enable-background:new 0 0 458.5 458.5;" xml:space="preserve" width="30px" height="30px">
													<g class="" style="fill:#F33;stroke:#F33;stroke-width:12px;stroke-linecap:round;stroke-linejoin:round;">
														<path d="M382.078,57.069h-89.78C289.128,25.075,262.064,0,229.249,0S169.37,25.075,166.2,57.069H76.421c-26.938,0-48.854,21.916-48.854,48.854c0,26.125,20.613,47.524,46.429,48.793V399.5c0,32.533,26.467,59,59,59h192.508c32.533,0,59-26.467,59-59V154.717c25.816-1.269,46.429-22.668,46.429-48.793C430.933,78.985,409.017,57.069,382.078,57.069z M229.249,30c16.244,0,29.807,11.673,32.76,27.069h-65.52C199.442,41.673,213.005,30,229.249,30z M354.503,399.501c0,15.991-13.009,29-29,29H132.995c-15.991,0-29-13.009-29-29V154.778c12.244,0,240.932,0,250.508,0V399.501z M382.078,124.778c-3.127,0-302.998,0-305.657,0c-10.396,0-18.854-8.458-18.854-18.854S66.025,87.07,76.421,87.07h305.657c10.396,0,18.854,8.458,18.854,18.854S392.475,124.778,382.078,124.778z"/>
														<path d="M229.249,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.715-15-15-15c-8.284,0-15,6.716-15,15v173.705	C214.249,385.607,220.965,392.323,229.249,392.323z"/>
														<path d="M306.671,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.716-15-15-15s-15,6.716-15,15v173.705	C291.671,385.607,298.387,392.323,306.671,392.323z"/>
														<path d="M151.828,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v173.705	C136.828,385.607,143.544,392.323,151.828,392.323z"/>
													</g>
												</svg>
											</div>
										</div>
									</td>
									<div 
										v-if="prog.isShow!=='0'"
										class="absolute w-full h-32 top-0 left-0 border-2 border-blue-400 bg-white z-50"
									>
										<div class="w-full h-full relative flex flex-col">
											<div v-if="bEditBox!==0" 
											class="w-full h-12 flex flex-row"
											>
												<FormKit
													form-class="p-1 bg-yellow-200"
													type="form"
													submit-label="儲存"
													@submit="saveData()"
												>
													<div class="w-2/5 ">
														<FormKit
															name="progName"
															label="程式名稱"
															type="select"
															:options="liwaSel1"
														/>
													</div>
													<div class="w-2/5 ">
														<span>自訂名稱</span>
														<span>程式名稱</span>
													</div>
														<FormKit
															name="iAuth"
															label="權限"
															type="number"
															min="0"
															max="9"
															step="1"
														/>						
												</FormKit>
											</div>
										</div>
									</div>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
</template>