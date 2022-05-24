<template>
	<div id="wdqb">
		<van-nav-bar title="我的钱包" left-text="返回" left-arrow @click-left="onChange" @click-right="onClickRight">
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
		<div id="main">
			<nav>
				<span>总资产(元)</span>
				<p>{{userarr.total_assets}}</p>
			</nav>
			<nav>
				<span>累计充值(元)</span>
				<p>{{userarr.unused_topup}}</p>
			</nav>
			<nav>
				<span>累计消费(元)</span>
				<p>{{userarr.unused_consum}}</p>
			</nav>
		</div>
		<div id="main2">
			<span><p>充值￥100赠送￥10</p><button @click="littleTopup">充值</button></span>
			<span><p>充值￥1000赠送￥100</p><button @click="bigTopup">充值</button></span>
		</div>
		<van-tabbar v-model="active">
		  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
		  <van-tabbar-item icon="apps-o" to="/fl">分类</van-tabbar-item>
		  <van-tabbar-item icon="cart-o" to="/preorder">购物车</van-tabbar-item>
		  <van-tabbar-item icon="user-circle-o" to="/wd">个人中心</van-tabbar-item>
		</van-tabbar>
	</div>
	
</template>

<script>
	import {get} from "../../tool/request.js";
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default{
		name:"wdqb",
		data() {
			return{
				 active:3,
				 userarr:{}
			}
		},
		created:function(){
			if(this.user!=""){
				this.selectUser()
			}
		},
		computed:{
			...mapState([
				'user',
			]),
		},
		methods: {
			async updateTotalAssets() {
				let res = await get(`http://localhost:8080/user/service/updateTotalAssets/${this.user}`);
				this.selectUser()
			},
			async selectUser() {
				let res = await get(`http://localhost:8080/user/service/getUserByName/${this.user}`);
				this.userarr=res.data.user;
			},
			async updateMoney(value) {
				let res = await get(`http://localhost:8080/user/service/updateMoney/${this.user}/${value}`);
				this.updateTotalAssets()
			},
		    onChange() {
				this.$router.go(-1)
		    },
			littleTopup(){
				let _this=this
				this.$toast.loading({
					message: '充值中...',
					forbidClick: true,
					onClose(){
						_this.$toast({
  							message: '充值成功',
  							position: 'bottom',
							onClose(){
								_this.updateMoney(110)
							}
						})
					}
				});
			},
			bigTopup(){
				let _this=this
				this.$toast.loading({
					message: '充值中...',
					forbidClick: true,
					onClose(){
						_this.$toast({
  							message: '充值成功',
  							position: 'bottom',
							onClose(){
								_this.updateMoney(1100)
							}
						})
					}
				});
			},
			onClickRight(){
				this.$router.push("/Searchs");
			}
		},
	}
</script>

<style >
	#main{
		width: 94vw;
		height: 10vh;
		margin:0 auto;
		background: rgba(0,0,0,0.7);
		display: flex;
		border-radius: 0.3125rem;
		margin-top: 0.3125rem;
	}
	#main nav{
		flex: 1;
		color: #ED6A0C;
		font-size: 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	#main nav span{
		width: 100%;
		display: inline-block;
		text-align: center;
	}
	#main nav p{
		width: 100%;
		display: inline-block;
		margin-left: -2%;
	}
	#main2{
		margin: 0.3125rem auto;
		width: 94vw;
		height:15vh ;
		background-color:#ffffff;
		display: flex;
		flex-direction: column;
	}
	#main2 span{
		height: 0.5vh;
		flex: 1;
	}
	#main2 span p{
		height: 100%;
		width: 50vw;
		text-align: center;
		display: inline-block;
	}
	#main2 button{
		width: 20vw;
		background-color: red;
		border-radius: 15px;
		color: #FFFFFF;
		margin-left:10vw;
	}
</style>
