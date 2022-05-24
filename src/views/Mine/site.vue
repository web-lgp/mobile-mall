<template>
	<div id="site">
		<van-nav-bar
		  title=""
		  left-text="我的收货地址"
		  :right-text="costodian"
		  left-arrow
		  @click-left="onClickLeft"
		  @click-right="onClickRight"
		/>
		<van-notice-bar
		  left-icon="volume-o"
		  mode="closeable"
		  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
		/>
		<div id="address-box" v-for="item in addressList" :key="item.id">
			<div id="show-address" ref="box">
				<div id="address-left">{{item.name.slice(0,1).toUpperCase()}}</div>
				<div id="address-main">
					<h4>{{item.name}}&nbsp;<span class="address-tel">{{item.tel}}</span><van-button v-show="item.defaultDetail==='true'" round  type="danger" class="minibtn">默认</van-button></h4>
					<p>{{item.province}}&nbsp;<span v-show="!(item.province===item.city)">{{item.city}}</span>&nbsp;{{item.county}}&nbsp;{{item.addressDetail}}</p>
				</div>
				<van-icon style="z-index:999;" name="edit" color="#000000" size="1.5rem" @click="siteEcho(item)"/>
			</div>
			<div id="address-hr" v-show="showOperator">
				<hr >
				<input type="radio" name="radios" :checked="item.defaultDetail==='true'" @change="updateisDefault(item.id)"><span>默认地址</span>
				<span id="address-delete" @click="addressDelete(item.id)">删除</span>
			</div>
		</div>
		
		<van-popup v-model="show" position="bottom" :style="{ height: '57%' }">
			<van-address-edit
				ref="myArea"
				:address-info="addressinfo"
				:area-list="areaList"
			    show-postal
			    show-delete
			    show-set-default
			    show-search-result
			    :area-columns-placeholder="sitearr"
			    @save="onSave"
			    @delete="onDelete"
			/>
		</van-popup>
		<div class="btu">
			<van-button type="primary" @click="addSite" color="linear-gradient(to right, #ff6034, #ee0a24)">+&nbsp;添加收货地址</van-button>
		</div>
	</div>
</template>

<script>
	import {get} from "../../tool/request.js";
	import { areaList } from '@vant/area-data'

	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name:"site",
		data(){
			return {
				show:false,
				areaList,
				addressList:[],
				showOperator:false,
				costodian:"管理",
				addressinfo:{
					name:"",
					tel:"",
					province:"",
					city:"",
					county:"",
					addressDetail:"",
					postalCode:"",
					isDefault:"",
				},
				updateSitefalg:true,
				sitearr:['请选择', '请选择', '请选择']
			}
		},
		created:function(){
			if(this.user!=""){
				this.selectSiteAll()
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods:{
			async selectSiteAll() {
				let res = await get(`http://localhost:8080/site/service/selectSiteAll/${this.user}`);
				this.addressList=res.data.user;
			},
			async deleteSite(id) {
				let res = await get(`http://localhost:8080/site/service/deleteSite/${this.user}/${id}`);
				this.selectSiteAll()
			},
			async updateSiteisDefault(id) {
				let res = await get(`http://localhost:8080/site/service/updataSiteisDefault/${id}`);
			},
			async updateSite(item) {
				let res = await get(`http://localhost:8080/site/service/updataSite/${item.province}/${item.city}/${item.county}/${item.name}/${item.postalCode}/${item.tel}/${item.addressDetail}/${item.isDefault}/${item.id}`);
			},
			onClickLeft(){
				this.$router.go(-1);
			},
			onClickRight(){
				this.showOperator=!this.showOperator
				if(this.showOperator){
					this.costodian="完成"
				}
				else{
					this.costodian="管理"
					this.selectSiteAll()
				}
			},
			updateisDefault(uid){
				this.updateSiteisDefault(uid)
			},
			siteEcho(item){
				this.updateSitefalg=false
				this.show=true
				this.addressinfo=item
				if(item.defaultDetail==='true')
					this.addressinfo.isDefault=true
				
			},
			addSite(){
				this.$router.push("/addsite")
			},
			addressDelete(id){
				this.$dialog.confirm({
				  message: '确定要删除该地址吗？',
				  confirmButtonText:"删除"
				})
				.then(() => {
					this.deleteSite(id)
				})
				.catch(() => {
				    this.$dialog.close();
				});
			},
			onSave(val){
				if(this.user!=""){
					if(this.updateSitefalg){
						this.insertSite(val)
					}else{
						this.updateSite(val)
						this.selectSiteAll()
						this.updateSitefalg=true
					}
					this.show= false
					this.selectSiteAll()
				}
				else{
					this.$dialog.confirm({
					  title: '登录',
					  message: '您尚未登录，无法添加地址?',
					  confirmButtonText:"去登陆"
					})
					.then(() => {
						this.$router.push("/login");
					})
					.catch(() => {
					    this.$dialog.close();
					});
				}
				if(this.show===false){
					for(var key in val)
						val[key]=""
				}
				
			},
			onDelete(val){
				this.show = false
				for(var key in val)
					val[key]=""
			},
		}
	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#site{
		height: 100vh;
		background-color: #F2F3F5;
	}
	#site .van-button--primary{
		width: 95vw;
		margin-left: 2.5vw;
		margin-top: 1.3vh;
		border-radius: 1.25rem;
	}
	#site .btu{
		width: 100vw;
		height: 8vh;
		background-color: #FFFFFF;
	}
	#site .btu{
		position: absolute;
		bottom: 0;
	}
	#address-box{
		width: 96vw;
		margin-left: 2vw;
		background-color: #ffffff;
		border-radius: 0.9375rem;
	}
	#site #show-address{
		width: 92vw;
		margin-left: 2vw;
		margin-top: 2vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	#site #show-address #address-left{
		width: 10vw;
		height: 10vw;
		border-radius: 50%;
		background-color: #F5AB35;
		color: #F06431;
		text-align: center;
		line-height: 10vw;
		margin-left: 0.625rem;
	}
	#site #show-address .van-icon-edit{
		margin-right:0.625rem;
	}
	#site #show-address #address-main{
		padding: 0.3125rem;
		width: 30vh;
	}
	#site #show-address #address-main p{
		width: 100%;
		color: #000000;
		text-align: left;
		margin-top: 0.3125rem;
		font-size: 0.9375rem;
	}
	#site #show-address #address-main .address-tel{
		color: #ABB2BF;
		font-size: 0.625rem;
	}
	#address-hr{
		width: 92vw;
		margin-left: 2vw;
		margin-top: 0.3125rem;
	}
	#address-hr span{
		font-size: 0.625rem;
		margin: 0.3125rem;
	}
	#address-hr #address-delete{
		margin-left: 60vw;
	}
	.minibtn{
		width: 60px;
		height: 20px;
		text-align: center;
		font-size: 10px;
		top: -4px;
		left: 10px;
	}
</style>
