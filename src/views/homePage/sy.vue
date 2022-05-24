<template>
	<div id="sy">
		<van-search v-model="value" placeholder="请输入搜索关键词" @focus="toSearch"/>
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item,index) in imglist" :key="index">
				<img :src="item" class="banner">
			</van-swipe-item>
		</van-swipe>
		<van-grid id="grid">
			<van-grid-item icon="shop-collect-o" text="全部商品" to="/allCommodity"/>
			<van-grid-item icon="coupon-o" text="优惠卷" />
			<van-grid-item icon="bag-o" text="积分商城" />
			<van-grid-item icon="clock-o" text="积分签到" />
		</van-grid>
		<div class="main_data">
			<div v-for="(item,index) in commodity" :key="index" class="data1" @click="toDetail(item.id)">
				<img :src="`${$store.state.path}${item.img}`">
				<p>{{item.name}}</p>
				<p>￥{{item.price}}</p>
			</div>
		</div>
		<van-divider @click="commLimit" v-show="this.limit<=this.commodity.length">点击加载更多</van-divider>
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
	export default {
		name: "sy",
		data() {
			return {
				imglist: [
					'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100022489774/FocusFullshop/CkNqZnMvdDEvMTc1NzU1LzIzLzE0NjkyLzg4MzYwLzYwYzZiNDZmRWYzMzdjNjA5LzNmM2NkMTAyOGJiZmY3N2EuanBnEgo5OTktdHlfMF8xMAE47ot6WK6luM70Ag/cr/s/q.jpg',
					'https://img20.360buyimg.com/pop/s1180x940_jfs/t1/207623/31/12229/70161/61b1dc96E36cf0d31/9d2c04ed49516db2.jpg.webp',
					'https://img11.360buyimg.com/pop/s1180x940_jfs/t1/213372/32/8467/78336/61c17f72E22c6e4ac/64fedb9207a2baf6.jpg.webp',
					'https://img.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg',
				],
				commodity: [],
				value: "",
				active: 0,
				limit:0
			}
		},
		created: function() {
			this.selectShoppingCartLimit();
		},
		methods: {
			async selectShoppingCartLimit() {
				this.limit+=6
				let res = await get(`http://localhost:8080/commodity/service/selectShoppingCartLimit/${this.limit}`);
				this.commodity = res.data.selectShoppingCartLimit;
				console.log(this.commodity)
			},
			toDetail(id) {
				this.$router.push(`/CommodityDetails/${id}`);
			},
			toSearch(){
				this.$router.push("/Searchs");
			},
			commLimit(){
				this.selectShoppingCartLimit();
			}
		},
	}
</script>

<style >
	#sy{
		margin-bottom: 50px;
	}
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		height: 150px;
	}

	.banner {
		width: 94%;
		height: 100%;
	}

	.main_data {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
	}

	.data1 {
		width: 45vw;
		margin: 2.5vw;
	}

	.data1 img{
		margin-left: 50%;
		transform: translate(-50%);
	}

	.data1 p {
		font-size: 0.8375rem;
		width: 6.25rem;
		margin-left: 50%;
		transform: translate(-50%);
		color: #000000;
	}

	.data1 p:nth-child(3) {
		color: #ED6A0C;
	}
</style>
