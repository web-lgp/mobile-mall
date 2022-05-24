<template>
	<div id="register">
		<van-nav-bar title="用户注册" left-text="返回" left-arrow  @click-left="onClickLeft"></van-nav-bar>
		<h2>用户注册</h2>
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="username"
		    name="用户名"
		    label="用户名"
		    placeholder="用户名"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  />
		  <van-field
		    v-model="password"
		    type="password"
		    name="密码"
		    label="密码"
		    placeholder="密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  />
		   <van-field v-model="tel" type="tel" label="手机号"  placeholder="手机号"/>
		   <van-field v-model="number" type="number" label="年龄"  placeholder="年龄"/>
		  <van-radio-group v-model="radio" direction="horizontal" label="性别"  >
		        <van-radio name="男">男</van-radio>
		        <van-radio name="女">女</van-radio>
		      </van-radio-group>
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">提交</van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
	import {get} from "../tool/request.js";
	export default{
		name:"register",
		data(){
			return {
				username:"",
				password:"",
				tel:"",
				number:"",
				radio:"",
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1);
			},
			onSubmit(){
				this.insterUser();
			},
			async selectByName() {
				let res = await get(`http://localhost:8080/user/service/getUserByName/${this.username}`);
				console.log(res);
				if(res.data.user!==null){
					this.$dialog.alert({
						title:"error",
						message:"用户名已被其他用户占用!!!",
					})
				}
			},
			async insterUser() {
				let res = await get(`http://localhost:8080/user/service/insertUser/${this.username}/${this.password}/${this.tel}/${this.number}/${this.radio}`);
				console.log(res.data.insertUser);
				if(res.data.insertUser==='ok'){
					this.$dialog.alert({
						title:"用户注册",
						message:"注册成功!!!",
					});
					this.username="";
					this.password="";
					this.tel="";
					this.number="";
					this.radio="";
				}
			},
		},
		watch:{
			username:{
				handler(val,val2){
					if(val!=="")
						this.selectByName();
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#register{
		width: 100vw;
		height: 100vh;
		background-image: url(https://img1.baidu.com/it/u=1798822758,69554612&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	#register h2{
		text-align: center;
		padding: 0.9375rem;
	}
	#register .van-form{
		padding: 0.9375rem;
	}
	#register .van-radio-group{
		padding: 0.9375rem;
	}
	.van-field{
		margin-top: 20px;
		opacity: 0.5;
	}
</style>
