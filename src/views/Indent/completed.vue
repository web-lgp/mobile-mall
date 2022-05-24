<template>
    <div>
         <van-nav-bar title="已完成" left-text="返回" left-arrow @click-left="onClickLeft"/>
        <div class="titlo" v-if="indents.length!=0">已完成商品</div>
        <div v-if="indents.length===0" style="margin-top:100px;"><van-empty description="空"/></div>
        <div>
            <van-cell-group v-for="item in indents" :key="item.commId" style="margin-bottom: 20px;">
                <van-cell title="商品已完成"/>
                <van-card
                    :num="item.addShoppingCart_num"
                    :price="item.price+'.00'"
                    :desc="item.productDescribe"
                    :title="item.name"
                    :thumb="`${$store.state.path}${item.img}`"
                />
                <van-cell title="快递"/>
                <van-cell title="下单时间" :value="item.indentDate" />
                <van-cell title="运费" value="免运费" />
                <van-cell title="优惠" value="无优惠" />
                <van-cell title="总金额" :value="item.addShoppingCart_num*item.price+'元'" />
                <van-cell title="支付方式" value="余额支付" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import {get} from "../../tool/request.js"
import {
		mapActions,
		mapState
	} from 'vuex'
export default {
    name: 'JyappCompleted',

    data() {
        return {
            indents:{},
        };
    },
    created(){
        this.selectIndents()
    },
    computed:{
		...mapState([
			'user',
		]),
    },

    methods: {
        async selectIndents() {
			let res = await get(`http://localhost:8080/indent/service/selectIndents/${this.user}/4`);
            this.indents=res.data.selectIndents
		}, 
        onClickLeft(){
            this.$router.push("/wd")
        }
    },
};
</script>

<style lang="css" scoped>
    .titlo{
        width: 100%;
        height: 100px;
        background-color: red;
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 100px;
      
    }
</style>