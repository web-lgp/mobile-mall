<template>
	<div id="site">
		<van-nav-bar
		  title=""
		  left-text="添加收货收货地址"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
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
				areaList,
                searchResult: [],
			}
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		methods:{
			async insertSite(val) {
				let res = await get(`http://localhost:8080/site/service/insertSite/${this.user}/${val.province}/${val.city}/${val.county}
				/${val.name}/${val.postalCode}/${val.tel}/${val.addressDetail}/${val.isDefault}`);
			},
			async updateAddisDefault() {
				let res = await get(`http://localhost:8080/site/service/updateAddisDefault/${this.user}`);
			},
			onClickLeft(){
				this.$router.go(-1);
			},
			onSave(val){
				if(val.isDefault){
					this.updateAddisDefault()
				}
				this.insertSite(val)
                this.onDelete(val)
                this.$router.go(-2)
			},
			onDelete(val){
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
