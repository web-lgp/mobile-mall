<template>
    <div>
        <div style="height: 100vh;background-color: rgb(223, 224, 226);">
        <van-nav-bar title="待收货" left-text="返回" left-arrow @click-left="onClickLeft"/>
         <div v-for="item in indents" :key="item.commId" class="main">
            <van-cell-group>
                <van-cell :title="item.indentDate" value="确认收货" :border="false"/>
            </van-cell-group>
            <van-card
                :num="item.addShoppingCart_num"
                :price="item.price+'.00'"
                :desc="item.productDescribe"
                :title="item.name"
                :thumb="`${$store.state.path}${item.img}`"
            />
            <div class="botm" @click="updateState(1,item.commId);$router.push('/completed')">确认收货</div>
            <div class="botm1" @click="details(item.commId)">立即查看</div>
         </div>
         <div v-if="indents.length===0" style="margin-top:100px;"><van-empty description="空"/></div>
    </div>
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
    name: 'JyappCollectgoods',

    data() {
        return {
            indents:{}
        };
    },
    computed:{
		...mapState([
			'user',
		]),
    },
    created(){
        this.selectIndents()
    },

    methods: {
        async selectIndents() {
			let res = await get(`http://localhost:8080/indent/service/selectIndents/${this.user}/3`);
            this.indents=res.data.selectIndents
            console.log(res);
		}, 
        async updateIndentDate(commId) {
			let res = await get(`http://localhost:8080/indent/service/updateIndentDate/${commId}/${getDate()}`);
		}, 
         async updateState(state,uid) {
            //更改商品状态
			let res = await get(`http://localhost:8080/indent/service/updateState/${this.user}/${state}/${uid}`);
		},
        onClickLeft(){
            this.$router.push("/wd")
        },
        details(commId){
            this.$router.push(`/details/${commId}`)
        }
    },
};
</script>

<style lang="css" scoped>
    .main{
        width:96%;
        height: 23%;
        background-color: #fafafa;
        margin: 10px auto;
        position: relative;
    }
    .botm,.botm1{
        position: absolute;
        right: 100px;
        bottom: 10px;
        width: 80px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius:5px ;
        font-size: 15px;
        border: 1px solid #463e3e;
    }
    .botm1{
        right: 10px;
    }
</style>