<template>
	<div id="preorder">
		<van-nav-bar title="购物车" :right-text="isEditor?'完成':'编辑'" left-arrow @click-left="onChangeleft" @click-right="onChangeright"/>
		<div v-if="addShoppingCart.length===0" style="margin-top:100px;"><van-empty description="空"/></div>
		<van-checkbox-group v-model="result" v-for="item in addShoppingCart" :key="item.id">
			<van-swipe-cell :disabled="!isEditor">
				<van-checkbox :name="item.id" class="fl" @click="CommCartChecked"></van-checkbox>
				<van-card
					:num="item.addShoppingCart_num"
					:price="item.price+'.00'"
					:desc="item.productDescribe"
					:title="item.name"
					class="goods-card"
					:thumb="`${$store.state.path}${item.img}`"
				/>
				<template #right v-if="isEditor">
					<van-button square text="删除" type="danger" class="delete-button" @click="deletecommodity(item.id,item.name)"/>
				</template>
				<van-stepper  v-if="isEditor" theme="round" v-model="item.addShoppingCart_num" button-size="22" disable-input class="stepper" @change="updateNumShoppingCart(item.id,$event)"/>
			</van-swipe-cell>
		</van-checkbox-group>
		<van-submit-bar :price="sum*100" :button-text="!isEditor?'结算':'删除'" @submit="onSubmit">
			<van-checkbox v-model="checkedAll" @click="CommCartAll">全选</van-checkbox>
		</van-submit-bar>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" to="/sy">首页</van-tabbar-item>
			<van-tabbar-item icon="apps-o" to="/fl">分类</van-tabbar-item>
			<van-tabbar-item icon="cart-o" to="/preorder">购物车</van-tabbar-item>
			<van-tabbar-item icon="user-circle-o" to="/wd">个人中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	import {getDate} from "../../tool/Date.js"
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name:"preorder",
		data(){
			return {
				active:2,
				addShoppingCart:[],
				result:[],
				checkedAll:false,
				isEditor:false,
				n:0,
				sum:0
			}
		},
		created: function() {
			if(this.user!=""){
				this.addShopping();
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
			async addShopping() {
				let res = await get(`http://localhost:8080/commodity/service/selectShoppingCart/${this.user}`);
				this.addShoppingCart = res.data.selBykey;
			},
			async inserIndent(item){
				let res = await get(`http://localhost:8080/indent/service/insertIndent/${getDate()}/${this.user}/${item.id}/${item.addShoppingCart_num}`);
			},
			async updateAddShoppingCart(id,num) {
				let res = await get(`http://localhost:8080/addShoppingCart/service/updateAddShoppingCart/${this.user}/${id}/${num}`);
			},
			async deleteCart(id) {
				let res = await get(`http://localhost:8080/addShoppingCart/service/deleteCart/${this.user}/${id}`);
				this.addShopping()
			},
			onChangeleft(){
				this.$router.go(-1)
			},
			onChangeright(){
				this.isEditor=!this.isEditor
			},
			onSubmit(item){
				if(!this.isEditor && this.result.length!=0){
					this.addShoppingCart.forEach(item=>{
						if(this.result.indexOf(item.id)!=-1){
							this.inserIndent(item)
							this.deleteCart(item.id)
						}
					})
					this.$router.push("/submitOrder")
				}else{
					this.addShoppingCart.forEach(item=>{
						if(this.result.indexOf(item.id)!=-1){
							this.deleteCart(item.id)
						}
					})
				}
			},
			toDetail(id){
				this.$router.push(`/CommodityDetails/${id}`);
			},
			deletecommodity(Cartid,name){
				let _this=this
				this.$toast.loading({
					message: `删除${name}中...`,
					forbidClick: true,
					onClose(){
						_this.$toast({
							  message: '删除成功',
 							 position: 'bottom',
						})
						_this.deleteCart(Cartid)
					},
				});
			},
			updateNumShoppingCart(id,value){
				this.updateAddShoppingCart(id,value)
			},
			CommCartAll(){
				if(this.n%2==0){
					this.checkedAll=true
					this.addShoppingCart.forEach(item=>{
						this.result.push(item.id)
					})
					this.n++;
					this.commCartSum()
				}else{
					this.result=[]
					this.sum=0
					this.n++
				}
			},
			CommCartChecked(){
				if(this.result.length==this.addShoppingCart.length){
					this.checkedAll=true
				}else{
					this.checkedAll=false
				}
				this.commCartSum()
			},
			commCartSum(){
				this.sum=0
				if(!this.isEditor){
					this.addShoppingCart.forEach(item=>{
						if(this.result.indexOf(item.id)!=-1){
							this.sum+=item.price*item.addShoppingCart_num
						}
					})
				}
				
			}
		},
	}
</script>

<style scoped>
	#preorder{
		width: 100vw;
		height: 100vh;
		margin-bottom: 50px;
		background-color: #EBEDF0;
	}
	.van-card__price-decimal,.van-card__price-integer,.van-card__price-currency{
		color: coral;
		font-size: 16px;
	}
	.stepper{
		position: absolute;
		z-index: 1;
		bottom: 10px;
		right: 50px;
	}
	 .goods-card {
		margin: 0;
	}

  .delete-button {
	  margin-top:50% ;
    height: 80%;
  }
	.fl{
		position: relative;
		top: 30px;
		z-index: 1;
	}
	.van-submit-bar{
		margin-bottom: 50px;
	}
	
</style>
