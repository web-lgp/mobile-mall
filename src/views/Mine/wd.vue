<template>
    <div class="user">
        <div class="top">
            <div class="topdiv"><van-icon name="setting-o" size="30px" color="#ffffff" /></div>
            <div style="margin-top:10px; margin-left: 30px;">
                <img
					style="border-radius: 50% !important;width:100px;height:100px;"
					:src="`${$store.state.path}${img}`"
                />
                <span class="username">{{username===""?'未登录':username}}</span>
            </div>
            <div class="Userxinxi">
                <div>
                    <span>{{userobj===null?0:userobj.total_assets}}</span>
                    <p>余额</p>
                </div>
				<div>
					<span>{{userobj===null?0:userobj.user_discounts}}</span>
					<p>优惠劵</p>
				</div>
				<div>
					<span>{{userobj===null?0:userobj.user_buynum}}</span>
					<p>购买数</p>
				</div>
				<div>
					<span>{{userobj===null?0:userobj.user_integral}}</span>
					<p>积分</p>
				</div>
            </div>
        </div>
        <div class="main_centen">
            <van-grid clickable :column-num="4" :border="false" icon-size="28px" >
                <van-grid-item icon="shop-o" text="待付款" to="/forCollection" :badge="one"/>
                <van-grid-item icon="logistics" text="待发货" to="/shipments" :badge="two"/>
                <van-grid-item icon="goods-collect-o" text="待收货" to="/Collectgoods" :badge="three"/>
                <van-grid-item icon="shopping-cart-o" text="已完成" to="/completed" :badge="four"/>
            </van-grid>
        </div>
        <div class="main">
            <van-cell title="地址管理" is-link  icon="location" style="color:#5fcda2" title-style="color:#1e1e1e" to="/site"/>
            <van-cell title="我的钱包" is-link  icon="card" style="color:#f897a8" title-style="color:#1e1e1e" to="/wdqb"/>
            <van-cell title="我的收藏" is-link  icon="goods-collect" style="color:#54b4ef" title-style="color:#1e1e1e" to="Collect"/>
            <van-cell title="我的足迹" is-link  icon="underway" style="color:#f8817e" title-style="color:#1e1e1e" to="/MyFootprint"/>
			<van-cell title="用户登录" is-link  icon="friends" style="color:#ee883b" title-style="color:#1e1e1e" to="/login"/>
            <van-cell title="修改密码" is-link  icon="setting" style="color:#e07472" title-style="color:#1e1e1e" @click="tochangePwd"/>
        </div>
        <div style="width: 94%;margin-left:3%; margin-top:30px;">
            <van-button type="danger" size="large" @click="UserExit">退出登录</van-button>
        </div>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" to="/sy">首页</van-tabbar-item>
			<van-tabbar-item icon="apps-o" to="/fl">分类</van-tabbar-item>
			<van-tabbar-item icon="shopping-cart-o" to="/preorder" >购物车</van-tabbar-item>
			<van-tabbar-item icon="manager-o" to="/wd">个人中心</van-tabbar-item>
		</van-tabbar>
    </div>
</template>

<script>
	import {get} from "../../tool/request.js"
		import {
			mapActions,
			mapState
		} from 'vuex'
		export default {
			name:"wd",
			data(){
				return {
					active: 3,
					userobj:{},
					username:"",
					userpwd:"",
					isfalg:"",
					img:"",
					one:0,
					two:0,
					three:0,
					four:0,
				}
			},
			created: function() {
				if(this.user!=""){
					this.isfalg=this.user;
					this.IndentCount(1)
					this.IndentCount2(2)
					this.IndentCount3(3)
					this.IndentCount4(4)
				}
				else{
					this.$dialog.confirm({
					title: '登录',
					message: '您尚未登录，无法查看购物车?',
					confirmButtonText:"去登陆"
					})
					.then(() => {
						this.$router.push("/login");
					})
					.catch(() => {
						this.$dialog.close();
						this.$router.go(-1);
					});
				}
			},
			computed: {
				...mapState([
					'user',
				]),
			},
			methods:{
				...mapActions([
					'setUserName',
				]),
				async IndentCount(num) {
					let res = await get(`http://localhost:8080/indent/service/IndentCount/${this.user}/${num}`);
					this.one=res.data.IndentCount
				},
				async IndentCount2(num) {
					let res = await get(`http://localhost:8080/indent/service/IndentCount/${this.user}/${num}`);
					this.two=res.data.IndentCount
				},
				async IndentCount3(num) {
					let res = await get(`http://localhost:8080/indent/service/IndentCount/${this.user}/${num}`);
					this.three=res.data.IndentCount
				},
				async IndentCount4(num) {
					let res = await get(`http://localhost:8080/indent/service/IndentCount/${this.user}/${num}`);
					this.four=res.data.IndentCount
				},
				async userByName() {
					let res = await get("http://localhost:8080/user/service/getUserByName/"+this.user);
					this.userobj=res.data.user;
					console.log(this.userobj)
					if(res.data!==null){
						this.username=res.data.user.user_name;
						this.userpwd=res.data.user.user_pwd;
						this.img=res.data.user.user_img;
					}
				},
				tochangePwd(){
					if(this.isfalg!="" && this.user!="")
						this.$router.push(`/changePwd/${this.username}/${this.userpwd}`);
					else{
						this.$toast({
							message: '未登录',
							position: 'bottom',
						});
					}
				},
				UserExit(){
					if(this.isfalg!=""){	
						this.$dialog.confirm({
						title: '退出',
							message: '确定退出吗?',
						})
						.then(() => {
							this.setUserName({
								key: "user",
								value: "",
							});
							this.userobj=null;
							this.username="";
							this.img="132.jpg";
						})
						.catch(() => {
							this.$dialog.close();
						});
					}
				},

			},
					watch:{
						isfalg:{
							immediate:true,
							handler(val1){
								if(val1!==""){
									this.userByName();
								}
							}
						}
					}
			}
</script>

<style lang="css" scoped>
    .user{
        height: 94vh;
        background-color: #f8f8f8;
    }
    .top{  
        position: relative;
        width: 100%;
        height: 26vh;
        background-color: red;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
    }
    .topdiv{
        position: relative;
        top: 8%;
        left: 88%;
    } 
    .username{
        position: relative;
        color:#ffffff;
        margin-left: 20px;
        top: -30px;
    }
    .Userxinxi{
        width: 94%;
        height: 60px;
        background: rgba(0, 0, 0, 0.7);
        margin-left:3% ;
        border-radius: 5px;
        display: flex;
        text-align: center;
        padding-top: 10px;
        margin-top: 15px;
    }
    .Userxinxi div{
        flex: 1;
    }
    .Userxinxi div span{
        color: #cc3356;
    }
    .Userxinxi div p{
        color: #ffffff;
        font-size: 10px;
        margin-top: 5px;
		margin-left: 0;
    }
    .main_centen{
        width: 94%;
        height: 20px;
        margin-left:3% ;
        margin-top:30px;
    }
    .main{
        width: 94%;
        margin-left:3% ;
        margin-top:80px; 
    }
</style>