<template>
	<div id="collect">
		<van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
		<header class="top"><span @click="deleteCollects">{{title}}</span></header>
		<div class="main_data">
			<div v-for="(item,index) in list" :key="index" class="data1" @click="toDetail(item.id)">
				<input type="checkbox" v-if="flag" name="checkboxTracks" :value="item.id"/>
				<img :src="`${$store.state.path}${item.img}`">
				<p>{{item.name}}</p>
				<p>￥{{item.price}}</p>
			</div>
		</div>
		<van-submit-bar button-text="删除" @submit="onSubmitDel" v-if="flag">
		  <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
		</van-submit-bar>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name:"collect",
		data(){
			return {
				list:{},
				checked:"",
				flag:false,
				title:"管理",
			}
		},
		created: function() {
			if(this.user!="")
				this.selectCollectAll();
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods:{
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				this.$router.push("/Searchs");
			},
			onSubmitDel(){
				let boxs=document.getElementsByName("checkboxTracks");
				for(var i=0;i<boxs.length;i++){
					if(boxs[i].checked==true){
						this.deleteCollect(boxs[i].value);
						boxs[i].checked=false;
					}
				}
				
			},
			checkAll(){
				let boxs=document.getElementsByName("checkboxTracks");
				for(var i=0;i<boxs.length;i++){
					boxs[i].checked=this.checked;
				}
			},
			toDetail(id){
				if(this.title==="管理")
					this.$router.push(`/CommodityDetails/${id}`);
			},
			deleteCollects(){
				this.flag=!this.flag;
				if(this.flag)
					this.title="取消"
				else
					this.title="管理"
			},
			async selectCollectAll() {
				let res = await get(`http://localhost:8080/commodity/service/selectCollect/${this.user}`);
				this.list = res.data.selBykey;
			},
			async deleteCollect(val) {
				let res = await get(`http://localhost:8080/collect/service/deleteCollectById/${this.user}/{collect_id}?collect_id=${val}`);
				this.selectCollectAll();
			},
		},
	}
</script>

<style scoped>
	#collect{
		width: 100%;
		height: 100vh;
		margin-bottom: 50px;
		 overflow-y: scroll;
		background-color: #E8E8E8;
	}
	#collect .top{
		width: 98vw;
		height: 4vh;
		margin: 1vw;
		background-color: #FFFFFF;
		text-align: right;
		color: #969799;
	}
	#collect .top span{
		height: 100%;
		display: inline-block;
		line-height: 200%;
		text-align: center;
		padding-right: 1rem;
	}
	#collect .van-submit-bar__bar{
		display: flex;
		justify-content: space-between;
	}
	#collect .main_data .data1{
		position: relative;
		background-color: #FFFFFF;
	}
</style>
