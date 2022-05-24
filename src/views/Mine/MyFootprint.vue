<template>
	<div id="MyFootprint">
		<van-nav-bar title="我的足迹" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
		<header class="top"><span @click="deleteTracks">{{title}}</span></header>
		<div class="main_data">
			<div v-for="(item,index) in list" :key="index" class="data1" @click="toDetail(item.id)">
				<input type="checkbox" v-if="flag" name="checkboxTracks" :value="item.id"/>
				<img :src="`${$store.state.path}${item.img}`">
				<p>{{item.name}}</p>
				<p>￥{{item.price}}</p>
			</div>
		</div>
		<van-submit-bar button-text="删除" @submit="onSubmitDel" style="padding:-50px;" v-if="flag">
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
		name:"MyFootprint",
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
				this.myTracksAll();
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
						this.deleteMyTracks(boxs[i].value);
						boxs[i].checked=false;
					}
				}
			},
			checkAll(){
				let boxs=document.getElementsByName("checkboxTracks");
				for(var i=0;i<boxs.length;i++){
					boxs[i].checked=this.checked
				}
			},
			toDetail(id){
				if(this.title==="登录")
					this.$router.push(`/CommodityDetails/${id}`);
			},
			deleteTracks(){
				this.flag=!this.flag;
				if(this.flag)
					this.title="取消"
				else
					this.title="管理"
			},
			async myTracksAll() {
				let res = await get(`http://localhost:8080/commodity/service/selectTracks/${this.user}`);
				this.list = res.data.selBykey;
			},
			async deleteMyTracks(val) {
				let res = await get(`http://localhost:8080/myTracks/service/deleteMyTracksById/${this.user}/{myTracks_id}?myTracks_id=${val}`);
				this.myTracksAll();
			},
		},
	}
</script>

<style >
	#MyFootprint{
		width: 100vw;
		height:100vh;
		margin-bottom: 50px;
		overflow-y: scroll;
		background-color: #E8E8E8;
	}
	#MyFootprint .top{
		width: 98vw;
		height: 4vh;
		margin: 1vw;
		background-color: #FFFFFF;
		text-align: right;
		color: #969799;
	}
	#MyFootprint .top span{
		height: 100%;
		display: inline-block;
		line-height: 200%;
		text-align: center;
		padding-right: 1rem;
	}
	#MyFootprint .van-submit-bar__bar{
		display: flex;
		justify-content: space-between;
	}
	#MyFootprint .main_data .data1{
		position: relative;
		background-color: #FFFFFF;
	}
	
	.gl{
		width: 100vw;
		height: 6vh;
		background-color: #ffffff;
		display: inline-block;
		text-align: right;
		line-height: 6vh;
		font-size: 0.9375rem;
		color: #969799;
	}
	.fz-img{
		margin-top: 0vh;
	}
	.fz-img nav{
		width: 20vw;
	}
	.imgs{
		width: 25vw;
		height: 15vh;
	}
</style>
