<template>
	<div id="login">
		<van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<h2>用户登录</h2>
		<van-form @submit="onSubmit">
			<van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" style="margin-top: 10px;"/>
			<div class="log_main">
				<van-button round  type="info" native-type="submit" size="normal">提交</van-button>
				<van-button round  type="info" size="normal" to="/register">注册</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js"
	import {mapActions,mapState} from 'vuex'
	export default {
		name: "login",
		data() {
			return {
				username: "",
				password: "",
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods: {
			//获取
			...mapActions([
				'setUserName',
			]),
			onSubmit() {
				this.loginAdmin();
			},
			async loginAdmin() {
				let _this=this
				let res = await get(`http://localhost:8080/user/service/login/${this.username}/${this.password}`);
				if (res.data.user === null) {
					this.$dialog.alert({
						title: "error",
						message: "账号或密码错误",
					})
				} else {
					//设置
					this.setUserName({
						key: "user",
						value: this.username,
					});
					this.$toast.loading({
						message: '登录中，稍后...',
						forbidClick: true,
						onClose(){
							_this.$toast({
								message: '登录成功',
								position: 'bottom',
								onClose(){
									_this.$router.push("/wd")
								}
							})
						}
					});
				}
			},
			onClickLeft() {
				this.$router.go(-1)
			},
		},
	}
</script>

<style scoped>
	#login{
		width: 100vw;
		height: 100vh;
		background-image: url(https://img2.baidu.com/it/u=1837714926,240778212&fm=253&fmt=auto&app=138&f=JPEG?w=295&h=500);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	#login h2 {
		text-align: center;
		padding: 0.9375rem;
	}

	#login .van-form {
		padding: 0.9375rem;
	}
	.log_main{
		margin-top: 10px;
		display: flex;
		justify-content: space-around;
	}
</style>
