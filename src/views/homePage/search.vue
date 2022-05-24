<template>
	<div id="search">
		<div>
			<van-search v-model="keyval"  shape="round" background="red" placeholder="请输入搜索关键词" id="sea" show-action @search="selectcomm">
				<template #action>
    				<div @click="onCancel" style="color:#000;">取消</div>
  				</template>
			</van-search>
		</div>
		
		<div class="session">
			<b style="margin:0 0 0 10px">最近搜索:</b>
			<div class="sousuo">
				<span v-for="n in 5" :key="n" class="biaoqian">{{sessionArr[n-1]}}</span>
			</div>
		</div>
		<div class="main_data">
			<div v-for="(item,index) in commselectByKey" :key="index" class="data1" @click="toDetail(item.id)">
				<img :src="`${$store.state.path}${item.img}`">
				<p>{{item.name}}</p>
				<p>￥{{item.price}}</p>
			</div>
		</div>
		<div class="search_tishi" v-show="commselectByKey.length===0">
			<van-empty image="error"/>
			<p>没有搜到该商品,换个关键字试试吧!</p>
		</div>
		
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	import {getToken,setToken} from '@/tool/session.js'
	export default{
		name:"search",
		data(){
			return {
				keyval:"",
				commselectByKey:[],
				sessionArr:[]
			}
		},
		mounted(){
			document.querySelector("#sea").focus();
		},
		methods:{
			async selectByKey(){
				let res = await get(`http://localhost:8080/commodity/service/selectBykey/${this.keyval}`);
				this.commselectByKey=res.data.selBykey;
			},
			async searchShopList() {
				let res = await get('http://localhost:8080/commodity/service/selectAllCommodity');
				this.commselectByKey = res.data.ListCommodity;
			},
			toDetail(id) {
				this.$router.push(`/CommodityDetails/${id}`)
			},
			onCancel(){
				this.$router.go(-1)
			},
			selectcomm(value){
				this.sessionArr.unshift(value)
				this.selectByKey()
			}
		},
		created: function() {
			this.searchShopList();
			for(var i=0;i<5;i++){
				if(getToken(`session${i}`)==='null'){
					continue;
				}else{
					this.sessionArr.push(getToken(`session${i}`))
				}
			}
		},
		beforeDestroy(){
			for(var i=4;i>=0;i--){
				if(this.sessionArr.length===i){
					break;
				}else{
					setToken(`session${i}`,this.sessionArr[i]);
				}
			}
		}
		
	}
</script>

<style scoped>
	#search{
		width: 96%;
		height: 100vh;
		margin-left: 2%;
		background-color: #f8f8f8;
		overflow-y: scroll;
	}
	.main_data{
		margin-left: -10px;
	}
	.session{
		width: 100%;
		height: 70px;
		
	}
	.sousuo{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.sousuo span{
		text-align: center;
		width: 20%;
	}
	.van-empty__image .van-empty__description{
		width: 100%;
		display: contents;
	}
	.search_tishi>p{
		width: 280px;
		margin-left: 50%;
		margin-top: -20px;
		transform: translateX(-50%);
		color: #989899;
		font-size: 16px;
	}
</style>
