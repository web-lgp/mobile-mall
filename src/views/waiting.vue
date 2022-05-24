<template>
	<div id="waiting">
		<lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_8vkrohue.json"  background="red"  speed="1"  style="width: 100%; height: 100%;" hover loop autoplay></lottie-player>
		<van-count-down :time="countTime" :auto-start="true" @finish="finish">
			<template #default="countTimeData">
				<div class="Time">
					<span class="block" style="margin-left: 3.8vw;">{{ countTimeData.seconds }}</span>
					<span style="margin-left:0.3125rem;" @click="getTo()">秒跳过</span>
				</div>
			</template>
		</van-count-down>
		<h3><i>勇敢牛牛不怕困难</i></h3>
		<div class="row"></div>
	</div>
</template>

<script>
	export default {
		name: "waiting",
		data() {
			return {
				countTime: 6 * 1000,
				active: "",
			}
		},
		methods:{
			finish() {
				console.log("1111");
			    this.$router.push({path:'/sy'});
			},
			getTo(){
				 this.$router.push({path:'/sy'});
			}
		}
	}
</script>

<style >
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#waiting {
		width: 100vw;
		height: 100vh;
		background-position-y: 3rem;
		background-position-x:1.25rem ;
	}

	.Time{
		width: 20vw;
		height: 5vw;
		position: absolute;
		top: 1.5rem;
		right: 20px;
		background-color:rgba(0,0,0,0.3);
		border-radius: 2.5vw;
	}
	h3{
		color: #FFFFFF;
		position: absolute;
		top:11rem;
		left:7rem;
		transform:rotate(-5deg);
		
	}
	.row{
		width: 9.5rem;
		height: 0.3125rem;
		border-radius: 0.125rem 0.3rem 0.25rem 0.125rem;
		background-color: #FFFFFF;
		position: absolute;
		top:13rem;
		left:7rem;
		transform:rotate(-5deg);
	}
</style>
