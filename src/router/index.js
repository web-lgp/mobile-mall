import Vue from 'vue'
import VueRouter from 'vue-router'
import sy from '@/views/homePage/sy'
import fl from '@/views/Classify/fl'
import wd from '@/views/Mine/wd'
import wdqb from '@/views/Mine/wdqb'
import MyFootprint from "@/views/Mine/MyFootprint"
import waiting from "@/views/waiting"
import CommodityDetails from "@/views/homePage/CommodityDetails"
import Searchs from "@/views/homePage/search"
import preorder from "@/views/shoppingTrolley/preorder"
import login from "@/views/Mine/login"
import register from "@/views/register"
import changePwd from "@/views/Mine/changePwd"
import Collect from "@/views/Mine/collect"
import site from "@/views/Mine/site"
import addSite from "@/views/Mine/addSite"
import AllCommodity from "@/views/homePage/AllCommodity"
import submitOrder from "@/views/Indent/submitOrder"
import forCollection from "@/views/Indent/forCollection"
import Shipments from "@/views/Indent/shipments"
import Collectgoods from "@/views/Indent/collectGoods"
import details from "@/views/Indent/details"
import completed from "../views/Indent/completed"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: waiting,
    },
    {
        path: '/sy',
        component: sy
    },
    {
        path: '/fl',
        component: fl
    },
    {
        path: '/wd',
        component: wd
    },
    {
        path: '/wdqb',
        component: wdqb
    },
    {
        path: '/MyFootprint',
        component: MyFootprint
    },
    {
        path: '/CommodityDetails/:id',
        component: CommodityDetails
    },
    {
        path: '/Searchs',
        component: Searchs
    },
    {
        path: '/preorder',
        component: preorder
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/changePwd/:username/:userpwd',
        component: changePwd
    },
    {
        path: '/Collect',
        component: Collect
    },
    {
        path: '/site',
        component: site
    },
    {
        path: '/addsite',
        component: addSite
    },
    {
        path: '/allCommodity',
        component: AllCommodity
    },
    {
        path: '/submitOrder',
        component: submitOrder
    },
    {
        path: '/forCollection',
        component: forCollection
    },
    {
        path: '/shipments',
        component: Shipments
    },
    {
        path: '/Collectgoods',
        component: Collectgoods
    },
    {
        path: '/details/:commId',
        component: details
    },
    {
        path: '/completed',
        component: completed
    },
]

const router = new VueRouter({
    routes
})


export default router