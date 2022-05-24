<template>
    <div class="JyappAllcommodity">
        <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onChange" @click-right="onClickRight" >
		  <template #right>
		    <van-icon name="search" size="18" />
		  </template>
		</van-nav-bar>
       <van-tabbar v-model="active" :fixed='false' class="dropdown" active-color="#ee0a24">
            <van-tabbar-item @click="TabberChangeOne">综合</van-tabbar-item>
            <van-tabbar-item @click="TabberChangeTwo">价格<van-icon name="sort" /></van-tabbar-item>
            <van-tabbar-item @click="TabberChangeThree">新品</van-tabbar-item>
        </van-tabbar>
        <van-grid>
            
        </van-grid>
        <van-grid :column-num="2">
            <van-grid-item  v-for="item in commselectAll" :key="item.id">
                <img :src="`${$store.state.path}${item.img}`">
				<p style="color:#000;">{{item.name}}</p>
				<p>￥{{item.price}}</p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import {get} from "../../tool/request.js";
export default {
    name: 'JyappAllcommodity',
    data() {
        return {
           active:0,
           commselectAll:{},
           isSort:true,
        };
    },
    created:function() {
		this.searchShopList();
    },
    methods: {
        onChange(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.$router.push("/Searchs")
        },
        async searchShopList() {
			let res = await get('http://localhost:8080/commodity/service/selectAllCommodity');
			this.commselectAll = res.data.ListCommodity;
		},
        async selectShoppingAscSort() {
			let res = await get('http://localhost:8080/commodity/service/selectShoppingAscSort');
			this.commselectAll = res.data.selectShoppingAscSort;
            console.log( res);
		},
        async selectShoppingDescSort() {
			let res = await get('http://localhost:8080/commodity/service/selectShoppingDescSort');
			this.commselectAll = res.data.selectShoppingDescSort;
		},
        TabberChangeOne(){
            this.searchShopList();
        },
        TabberChangeTwo(){
            if(this.isSort){
                this.selectShoppingAscSort()
                this.isSort=!this.isSort
            }else{
                this.selectShoppingDescSort()
                this.isSort=!this.isSort
            }
        },
        TabberChangeThree(){
             this.searchShopList();
        },
    },
};
</script>

<style lang="css" scoped>
    .JyappAllcommodity{
        height: 100vh;
        overflow-y: scroll;
        background-color: #f8f8f8;
    }
    .dropdown{
        width: 96%;
        margin-left:2%;
        margin-top: 8px;
        font-size: 20px;
    }
</style>