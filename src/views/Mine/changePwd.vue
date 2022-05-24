<template>
	<div id="changePwd">
		<van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onChange"></van-nav-bar>
		<h2>修改密码</h2>
		<van-form @submit="onSubmit">
		  <van-field
		    v-model="username"
		    name="用户名"
		    label="用户名"
		    placeholder="请输入当前用户名"
		    :rules="[{ required: true, message: '请填写用户名' }]"
		  />
		  <van-field
		    v-model="password"
		    type="password"
		    name="密码"
		    label="密码"
		    placeholder="请输入当前密码"
		    :rules="[{ required: true, message: '请填写密码' }]"
		  />
		  <van-field
		    v-model="newpassword"
		    type="password"
		    name="新密码"
		    label="新密码"
		    placeholder="请输入新密码"
		    :rules="[{ required: true, message: '请填写新密码' }]"
		  />
		  <div style="margin: 16px;">
		    <van-button round block type="info" native-type="submit">提交</van-button>
		  </div>
		</van-form>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	export default {
		name:"changePwd",
		data(){
			return {
				username:"",
				password:"",
				newpassword:"",
			}
		},
		methods:{
			onChange(){
				this.$router.go(-1)
			},
			onSubmit(){
				if(this.$route.params.username===this.username && this.$route.params.userpwd===this.password && this.password!=this.newpassword){
					this.$dialog.alert({
						title:"修改成功",
						message:"正在为你跳转中稍后....",
					},setTimeout(()=>{
						this.$router.push("/wd")
					},500))
					this.updatePwd();
				}
				else{
					this.$dialog.alert({
						title:"修改失败",
						message:"请检查用户名或密码是否正确!!!",
					})
				}
					
			},
			async updatePwd() {
				let res = await get(`http://localhost:8080/user/service/updateUser/${this.username}/${this.password}/{password}?password=${this.newpassword}`);
			},
		},
		
	}
</script>

<style scoped="scoped">
	#changePwd h2{
		text-align: center;
		padding: 0.9375rem;
	}
	#changePwd .van-form{
		padding: 0.9375rem;
	}
</style>
