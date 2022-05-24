<template>
	<div id="CommodityDetails">
		<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onChange" @click-right="onClickRight" >
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
		<div id="main_comm">
			<img :src="`${$store.state.path}${selByCommId.img}`">
			<nav>
				<span>￥{{selByCommId.price}}</span>
				<p>{{selByCommId.productDescribe}}</p>
			</nav>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="cart" text="购物车" :badge="ShoppingCartList.length" to="/preorder" color="#ff5000"/>
			<van-goods-action-icon :icon="text?'star':'star-o'" :text="text?'已收藏':'收藏'" color="#ff5000" :badge="CollectList.length"  @click="toggclassColor"/>
			<van-goods-action-button type="warning" text="加入购物车"  @click="addShoppingCart"/>
			<van-goods-action-button type="danger" text="立即购买" />
		</van-goods-action>
	</div>
</template>
<script>
	import {get} from "../../tool/request.js";
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name:"CommodityDetails",
		data(){
			return{
				selByCommId:{},
				classColor:"",
				iconTupian:"star-o",
				falg:1,
				goShoppingList:[],
				CollectList:[],
				ShoppingCartList:[],
				text:false,
			}
		},
		created: function() {
			this.selectByCommId();
			if(this.user!=""){
				this.insertMyTracks();
				this.selectByIdAndUserName();
				this.selectCollectAll();
				this.ShoppingCart();
				this.selectCollectById()
			}
		},
		computed:{
			...mapState([
				'user',
			]),
		},
		methods:{
			async ShoppingCart() {
				let res = await get(`http://localhost:8080/commodity/service/selectShoppingCart/${this.user}`);
				this.ShoppingCartList = res.data.selBykey;
			},
			async selectCollectAll() {
				let res = await get(`http://localhost:8080/commodity/service/selectCollect/${this.user}`);
				this.CollectList = res.data.selBykey;
			},
			async selectByCommId() {
				let res = await get("http://localhost:8080/commodity/service/selectByIdCommodity/"+this.$route.params.id);
				this.selByCommId=res.data.selByComm;
			},
			async insertAddShoppingCart() {
				let res = await get(`http://localhost:8080/addShoppingCart/service/insertAddShoppingCart/${this.user}/${this.selByCommId.id}`);
				this.ShoppingCart()
			},
			async insertMyTracks() {
				let res = await get(`http://localhost:8080/myTracks/service/insertMyTracks/${this.user}/${this.$route.params.id}`);
			},
			async insertCollect() {
				let res = await get(`http://localhost:8080/collect/service/insertCollect/${this.user}/${this.$route.params.id}`);
				this.selectCollectAll()
			},
			async deleteCollectById() {
				let res = await get(`http://localhost:8080/collect/service/deleteCollectById/${this.user}/{collect_id}?collect_id=${this.$route.params.id}`);
				this.selectCollectAll()
			},
			async selectByIdAndUserName() {
				let res = await get(`http://localhost:8080/addShoppingCart/service/selectByIdAndUserName/${this.user}/${this.$route.params.id}`);
				this.goShoppingList=res.data.selectByIdAndUserName;
			},
			async updateAddShoppingCartAdds() {
				let res = await get(`http://localhost:8080/addShoppingCart/service/updateAddShoppingCartAdds/${this.user}/${this.$route.params.id}`);
				this.ShoppingCart()
			},
			async selectCollectById() {
				let res = await get(`http://localhost:8080/collect/service/selectCollectById/${this.user}/${this.$route.params.id}`);
				this.text=res.data.selectCollectById
			},
			toggclassColor(){
				if(this.user!=""){
					if(this.classColor==""){
						this.$toast.success('收藏成功');
						this.classColor="red";
						this.text=true
						this.insertCollect();
					}
					else{
						this.classColor="";
						this.deleteCollectById();
						this.text=false
						this.$toast.success('取消收藏');
					}
				}
			},
			onChange(){
				this.$router.go(-1)
			},
			onClickRight(){
				this.$router.push("/Searchs")
			},
			
			addShoppingCart(){
				if(this.user!=""){
					this.$dialog.confirm({
					  title: '加入购物车',
					  message: '确定加入购物车吗?',
					})
					.then(() => {
						if(this.goShoppingList==0){
							this.insertAddShoppingCart();
						}
						else{
							this.updateAddShoppingCartAdds();
						}
						this.$toast.success('加入成功')
					})
					.catch(() => {
					    this.$dialog.close();
					});
				}
				else{
					this.$dialog.confirm({
					  title: '登录',
					  message: '您尚未登录，无法加入购物车?',
					  confirmButtonText:"去登陆"
					})
					.then(() => {
						this.$router.push("/login");
					})
					.catch(() => {
					    this.$dialog.close();
					});
				}
				
			}
		},
	}
</script>
<style >
	#CommodityDetails{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	#main_comm{
		width: 90vw;
		height: 90vh;
		background-color: #f8f8f8;
		margin: 0 auto;
	}
	#main_comm img{
		width: 80vw;
		height: 45vh;
		margin-left: 4%;
		margin-top: 4%;
	}
	#main_comm nav{
		width: 86vw;
		margin-left: 2vw;
		background-color: #ffffff;
		margin-top: 3vh;
	}
	#main_comm nav span{
		padding: 0.3125rem;
		color: #ED6A0C;
		font-size: 1.5625rem;
	}
	#main_comm nav p{
		width: 40vw;
		font-size: 0.625rem;
		text-align: left;
		margin-left: -0.5vw;
	}
</style>
