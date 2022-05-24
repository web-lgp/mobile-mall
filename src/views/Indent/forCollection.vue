<template>
    <div id="JyappForcollection">
        <van-nav-bar title="待付款" left-text="返回" left-arrow @click-left="onClickLeft">
            <template #right>
                <van-cell title="分享" @click="showShare = true" />
                <van-share-sheet
                    v-model="showShare"
                    title="立即分享给好友"
                    :options="options"
                    @select="onSelect"
                />
            </template>
        </van-nav-bar>
        <div v-for="item in indents" :key="item.commId" style="position: relative;width: 96%;background-color: #fff;margin: 10px auto;">
            <span style="position:absolute;top:10px;right:10px;z-index:999;color:orangered;">等待买家付款</span>
            <van-card
                :num="item.addShoppingCart_num"
                :price="item.price+'.00'"
                :desc="item.productDescribe"
                :title="item.name"
                :thumb="`${$store.state.path}${item.img}`"
            />
            <div class="main">需付款￥{{item.price * item.addShoppingCart_num}}</div>
            <div class="btm">
                <div class="div2" @click="deleteIndents(item.commId)">取消订单</div>
                <div class="div3" @click="$router.push('/site')">修改地址</div>
                <div class="div4">找朋友付</div>
                <div class="div1" @click="showPopup(item.addShoppingCart_num,item.price,item.commId)">付款</div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom"  :lazy-render="true" :style="{ height: '30%' }">
                <van-nav-bar title="请选择付款方式" :border="false"/>
                <van-radio-group v-model="radio">
                    <van-cell title="微信支付" icon="wechat-pay" :border="false">
                        <template #right-icon>
                            <van-radio name="1"></van-radio>
                        </template>
                    </van-cell>
                    <van-cell title="支付宝支付" icon="alipay" :border="false">
                        <template #right-icon>
                            <van-radio name="2"></van-radio>
                        </template>
                    </van-cell>
                    <van-cell title="零钱支付" icon="card">
                        <template #right-icon>
                            <van-radio name="3"></van-radio>
                        </template>
                    </van-cell>
                </van-radio-group>
                <van-button size="large" round type="info" 
                style="width: 96%;margin: 10px 2%;"
                @click="zhifu(nums,xfs,cds)">确认支付</van-button>
        </van-popup>
        <div v-if="indents.length===0" style="margin-top:100px;"><van-empty description="空"/></div>
    </div>
</template>

<script>
import {get} from "../../tool/request.js";
import {
		mapActions,
		mapState
	} from 'vuex'
export default {
    name: 'JyappForcollection',

    data() {
        return {
            radio:0,
            showShare: false,
            show:false,
            options: [
                [
                    { name: '微信', icon: 'wechat' },
                    { name: '朋友圈', icon: 'wechat-moments' },
                    { name: '微博', icon: 'weibo' },
                    { name: 'QQ', icon: 'qq' },
                ],
                [
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                    { name: '小程序码', icon: 'weapp-qrcode' },
                ],
            ],
            indents:{},
            usermag:0,
            nums:0,
            xfs:0,
            cds:0
        };
    },
    computed:{
		...mapState([
			'user',
		]),
    },
    created(){
        this.selectIndents()
        this.userByName()
    },
    methods: {
        async userByName() {
			let res = await get(`http://localhost:8080/user/service/getUserByName/${this.user}`);
            this.usermag=res.data.user.total_assets
        },
        async updateState(state,uid) {
            //更改商品状态
			let res = await get(`http://localhost:8080/indent/service/updateState/${this.user}/${state}/${uid}`);
		},
        async updateUserMessage(num,xiaofei) {
			let res = await get(`http://localhost:8080/user/service/updateUserMessage/${this.user}/${num}/${xiaofei}`);
		},
        async selectIndents() {
			let res = await get(`http://localhost:8080/indent/service/selectIndents/${this.user}/1`);
            this.indents=res.data.selectIndents
            console.log(res);
		},
        async deleteIndent(did) {
			let res = await get(`http://localhost:8080/indent/service/deleteIndent/${this.user}/${did}`);
            this.selectIndents()
		},
         async updateState(state,uid) {
            //更改商品状态
			let res = await get(`http://localhost:8080/indent/service/updateState/${this.user}/${state}/${uid}`);
		},
        deleteIndents(did){
            this.deleteIndent(did)
        },
        showPopup(num,xf,cd){
            this.show=!this.show
            this.nums=num
            this.xfs=xf
            this.cds=cd
        },
        zhifu(num,xf,cd){
            if(this.radio==3){
                if(this.usermag<(num*xf)){
                    this.$dialog.confirm({
                        title: '余额不足',
                        message: '账户余额不足,去充值',
                    })
                    .then(() => {
                        this.$router.push("/wdqb")
                    })
                    .catch(() => {
                           
                    });
                }
                else{
                    let _this=this
                    this.updateUserMessage(num,xf*num)
                    this.updateState(1,cd)
                    this.$toast.loading({
                        message: '正在支付...',
                        forbidClick: true,
                        onClose(){
                            _this.$toast({
                                message: '支付成功',
                                position: 'bottom',
                                onClose(){
                                    _this.$router.push("/shipments")
                                }
                            })
                        }
                    });
                }
            }
        },
        onSelect(option) {
            this.showShare = false;
        },
        onClickLeft() {
            this.$router.push("/wd")
        },
    },
};
</script>

<style lang="css" scoped>
    #JyappForcollection{
        height: 100vh;
        background-color: rgb(223, 224, 226);
    }
    .main{
        margin: 10px;
        text-align: right;
        color: black;
    }
    .btm{
        display: flex;
        justify-content: space-around;
        color: black;
        font-size: 10px;
    }
    .div1,.div2,.div3,.div4{
        width:20%;
        height: 30px;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #dfe0e2;
        margin-bottom: 10px;
    }
    .div1{
       
        color:orangered;
        border: orangered 1px solid;
    }
</style>