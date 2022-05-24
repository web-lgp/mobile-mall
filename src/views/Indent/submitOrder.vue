<template>
    <div id="Submitorder">
        <van-nav-bar left-text="确认订单" left-arrow @click-left="onChangeleft" />
        <div class="main_top">
            <div v-if="currentContact===null" style="margin:20px auto;" @click="$router.push('/site')">暂无地址,点我添加地址</div>
            <van-contact-card
            v-else
                type="edit"
                :name="currentContact.name"
                :tel="currentContact.tel"
                @click="onEdit"
                style="border-radius: 10px;"
            />
        </div>
        <div class="main_cent"  v-for="item in indents" :key="item.id">
            <van-card
                :num="item.addShoppingCart_num"
                :price="item.price+'.00'"
                :desc="item.productDescribe"
                :title="item.name"
                :thumb="`${$store.state.path}${item.img}`"
            />
            <van-popup v-model="show" closeable round position="bottom" :style="{ height: '30%' }">
                <van-nav-bar title="配送服务" :border="false"/>
                <van-cell value="快递 免邮" style="font-weight:800;font-size: 14px;color:#000;">
                    <template #title>
                        <span class="custom-title">普通配送</span>
                    </template>
                </van-cell>
                <van-cell value="免费" style="font-weight:800;font-size: 14px;color:#000;">
                    <template #title>
                        <span class="custom-title">运费险</span>
                    </template>
                </van-cell>
                 <van-cell value="付款后24小时内发货" style="font-weight:800;font-size: 14px;color:#000;">
                    <template #title>
                        <span class="custom-title">发货时间</span>
                    </template>
                </van-cell>
            </van-popup>
            <van-cell title="配送服务" is-link  @click="show=!show" :border="false"/>

            <van-cell title="订单备注" is-link  @click="show2=!show2"/>
            <van-popup v-model="show2" closeable round position="bottom" :style="{ height: '30%' }">
                <van-nav-bar title="订单备注" :border="false"/>
                <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="订单备注:"
                    type="textarea"
                    maxlength="200"
                    placeholder="选填，请先和商家协商一致,付款后商家可见"
                    show-word-limit
                />
                <van-button block round color="linear-gradient(to right, #ff6034, #ee0a24)" class="popupBth">确定</van-button>
            </van-popup>
            <van-submit-bar
                :loading="false"
                :price="sum*100"
                button-text="提交订单"
                @submit="onSubmit()"
                >共{{indents.length}}件
            </van-submit-bar>
        </div>
        
        <div class="main_main">
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
        </div>
       
    </div>
</template>

<script>
import {get} from "../../tool/request.js";
import {
		mapActions,
		mapState
	} from 'vuex'
export default {
    name: 'JyappSubmitorder',

    data() {
        return {
            indents:[],
            currentContact: {},
            show:false,
            show2:false,
            message:"",
            radio:0,
            usermag:0
        };
    },
    created(){
        this.selectIndents()
        this.selectDefaultSite()
        this.userByName()
    },
    computed:{
		...mapState([
			'user',
		]),
        sum(){
            let he=0
            this.indents.forEach(p => {
                he+=p.price*p.addShoppingCart_num
            });
            return he
        }
	},
    methods: {
        async updateUserMessage(num,xiaofei) {
			let res = await get(`http://localhost:8080/user/service/updateUserMessage/${this.user}/${num}/${xiaofei}`);
		},
        async userByName() {
			let res = await get(`http://localhost:8080/user/service/getUserByName/${this.user}`);
            this.usermag=res.data.user.total_assets
        },
        async selectIndents() {
			let res = await get(`http://localhost:8080/indent/service/selectIndents/${this.user}/0`);
            this.indents=res.data.selectIndents
		},
        async selectDefaultSite() {
			let res = await get(`http://localhost:8080/site/service/selectDefaultSite/${this.user}`);
            this.currentContact=res.data.Site
		},
        async updateState(state,uid) {
            //更改商品状态
			let res = await get(`http://localhost:8080/indent/service/updateState/${this.user}/${state}/${uid}`);
		},
        onChangeleft(){
            this.$dialog.confirm({
                title: '确定要放弃付款吗?',
                message: '本订单支持7天无理由退货',
                confirmButtonColor:"blue",
                confirmButtonText:"继续支付",
                cancelButtonText:"确认",
            })
            .then(() => {
               
            })
            .catch(() => {
                this.indents.forEach(p => {
                    this.updateState(1,p.commId)
                });
                this.$router.push("/forCollection")
            });
            
        },
        onEdit() {
            this.$router.push("/site")
        },
        onSubmit(){
            if(this.radio==1 || this.radio==2){
                this.$toast({
                    message: '程序员正在赶来的路上',
                    position: 'bottom',
                });
            }
            if(this.radio==3 && this.currentContact!=null){
                if(this.usermag<this.sum){
                    this.$dialog.confirm({
                        title: '余额不足',
                        message: '账户余额不足,去充值',
                    })
                    .then(() => {
                        this.$router.push("/wdqb")
                    })
                    .catch(() => {
                           
                    });
                }else{
                    let _this=this
                    this.indents.forEach(p=>{
                        this.updateUserMessage(p.addShoppingCart_num,p.price*p.addShoppingCart_num)
                        this.updateState(2,p.commId)
                    })
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
            }else{
                this.$toast({
                    message: '请选择支付方式或先添加地址',
                    position: 'bottom',
                });
            }
        }
    },
};
</script>

<style lang="css" scoped>
    #Submitorder{
        height: 100vh;
        background-color: rgb(223, 224, 226);
    }
    .main_top{
        position: relative;
        width: 96%;
        margin: 10px auto;
    }
    
    .main_cent{
        width: 96%;
        background-color: #fff;
        margin: 0 auto;
    }
    .van-nav-bar__title{
       font-weight: 700;
       font-size: 20px;
    }
    .van-card{
        background-color: #fff;
    }
    .popupBth{
        width: 93%;
        margin: 60px auto;
    }
    .main_main{
         width: 96%;
        margin: 20px auto;
        background-color: #fff;
    }
     .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>