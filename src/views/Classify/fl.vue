<template>
	<div id="fl">
		<van-nav-bar title="商品分类" left-text="返回" left-arrow @click-left="onChangeleft" @click-right="onChangeright">
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
		<van-sidebar v-model="activeKey"  @change="onChange">
		  <van-sidebar-item title="手机" />
		  <van-sidebar-item title="水果" />
		  <van-sidebar-item title="化妆品" />
		  <van-sidebar-item title="包包" />
		</van-sidebar>
		<div class="fz-img">
			<nav v-for="(item,index) in datalist" :key="index" @click="toDetail(item.id)">
				<img :src="`${$store.state.path}${item.img}`">
				<p>{{item.name}}</p>
			</nav>
		</div>
		<van-tabbar v-model="active" @change="onChange">
		  <van-tabbar-item icon="home-o" to="/sy">首页</van-tabbar-item>
		  <van-tabbar-item icon="apps-o" to="/fl">分类</van-tabbar-item>
		  <van-tabbar-item icon="shopping-cart-o" to="/preorder" >购物车</van-tabbar-item>
		  <van-tabbar-item icon="manager-o" to="/wd">个人中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	export default {
	  name:"fl",
	  data() {
	    return {
	      activeKey: 0,
		  active: 1,
		  barkey:"手机",
		  datalist:{},
	    }
	},
	created: function() {
		this.selectByKey();
	},
	methods: {
	    onChangeleft() {
			this.$router.go(-1)
	    },
		onChangeright(){
			this.$router.push("/Searchs");
		},
		onChange(index){
			this.activeKey=index;
			switch(index){
				case 0:
					this.barkey="手机"
					break;
				case 1:
				  	this.barkey="水果";
				  	break;
				case 2:
				  	this.barkey="化妆品";
				  	break;
				case 3:
					this.barkey="包包";
					break;
			}
		},
		async selectByKey(){
			let res = await get(`http://localhost:8080/commodity/service/selectBykey/${this.barkey}`);
			this.datalist=res.data.selBykey;
		},
		toDetail(id) {
			this.$router.push(`/CommodityDetails/${id}`)
		},
	},
	watch:{
		barkey:{
			immediate:true,
			handler(){
				this.selectByKey();
			}
		}
	}
}
</script>

<style >
	.fz-img{
		width: calc(100vw - 25vw);
		position: absolute;
		top:47px;
		left:21.2vw ;
		display: flex;
		flex-wrap: wrap;
	}
	nav{
		width: 1.5625rem;
		float: left;
		margin-top: 0.3125rem;
		margin-left:0.625rem;
	}
	img{
		width: 23vw;
		height: 13vh;
		padding-left: 0.625rem;
	}
	p{
		width: 5rem;
		text-align: center;
		margin:0.5rem;
		padding-left: 0.75rem;
		color: #ED6A0C;
		font-size: 0.625rem;
	}
</style>
