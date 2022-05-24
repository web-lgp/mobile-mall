<template>
    <div>
        <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
        <div class="titlo">服务商已发货</div>
        <div>
            <van-contact-card
                type="edit"
                :name="currentContact.name"
                :tel="currentContact.tel"
                :editable="false"
            />
            <van-cell-group>
                <van-cell title="订单状态" value="待收货" />
                <van-card
                    :num="indent.addShoppingCart_num"
                    :price="indent.price+'.00'"
                    :desc="indent.productDescribe"
                    :title="indent.name"
                    :thumb="`${$store.state.path}${indent.img}`"
                />
                <van-cell title="快递"/>
                <van-cell title="下单时间" :value="indent.indentDate" />
                <van-cell title="运费" value="免运费" />
                <van-cell title="优惠" value="无优惠" />
                <van-cell title="总金额" :value="indent.addShoppingCart_num*indent.price+'元'" />
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
    name: 'JyappDetails',

    data() {
        return {
            indent:{},
            currentContact:{}
        };
    },
    created(){
        this.selectIndent()
        this.selectDefaultSite()
    },
    computed:{
		...mapState([
			'user',
		]),
    },

    methods: {
        async selectIndent() {
			let res = await get(`http://localhost:8080/indent/service/selectIndent/${this.$route.params.commId}`);
            this.indent=res.data.selectIndent
            console.log(res);
		},
        async selectDefaultSite() {
			let res = await get(`http://localhost:8080/site/service/selectDefaultSite/${this.user}`);
            this.currentContact=res.data.Site
		},
        onClickLeft(){
            this.$router.go(-1)
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