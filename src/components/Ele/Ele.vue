<template lang="html">
    <div class="goods">
        <!-- 左边分类 -->
        <div class="goods-menu" id="goods-menu">
            <ul>
                <li v-for="(item,index) in goods" :key="index">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <!-- 右边商品列表 -->
        <div class="goods-list" id="goods-list">
            <div ref="list">
                <dl v-for="(item,index) in goods" :key="index">
                    <dt>{{item.name}}</dt>
                    <dd v-for="(food,idx) in item.foods" :key="idx">
                        <img :src="food.icon" alt="">
                        <div class="food">
                            <h2>{{food.name}}</h2>
                            <p class="desc" v-if="food.description">{{food.description}}</p>
                            <p class="sale">月售份{{food.sellCount}} 好评率{{food.rating}}</p>
                            <p class="price">
                                <strong><span>￥</span>{{food.price}}</strong>
                                <del v-if="food.oldPrice">￥{{food.oldPrice}}</del>
                            </p>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import IScroll from '../../../static/js/iscroll-probe'

export default {
    data(){
        return {
            goods : []
        }
    },
    created(){
        //使用axios发请求，获取数据，并赋值给goods
        axios.get('https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=1020107')
             .then(response => {
                 this.goods = response.data;
                 console.log(this.goods);
                 //此处调用refresh，刷新一下，重新计算高度
                setTimeout(() => {
                    this.menuScroll.refresh();
                    this.listScroll.refresh();
                },10);
             })
             .catch(error => console.log(error));
    },
    mounted(){
        this.menuScroll = new IScroll("#goods-menu",{click:true});
        this.listScroll = new IScroll("#goods-list",{probeType:2, click:true});
    }
}
</script>

<style lang="less" scoped>
.goods {
    position: fixed;
    left: 0;
    right: 0;
    top: 175px;
    bottom: 48px;
    overflow: hidden;
    display: flex;
    .goods-menu {
        background: #f3f5f7;
        min-width: 80px;
        width: 80px;
        li {
            height: 54px;
            padding: 0 12px;
            p {
                height: 54px;
                border-bottom: 1px solid rgba(7,17,27,.1);
                font-size: 12px;
                font-weight: 200;
                color: rgb(77,85,93);
                display: flex;
                align-items: center;
            }
            &.active{
                background: #fff;
                p {
                    border-bottom: none;
                }
            }
        }
    }
    .goods-list{
        flex-grow: 1;
        dt {
            background: #f3f5f7;
            border-left: 3px solid #d9dde1;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: rgb(147,153,159);
            padding-left: 14px;
        }
        dd {
            margin:18px;
            display: flex;

            img {
                width: 57px;
                height: 57px;
                margin-right: 10px;
            }
            .food{
                position: relative;
                flex-grow: 1;
                h2 {
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .desc,.sale {
                    font-size: 10px;
                    color: rgb(147,153,159);
                    margin:8px 0;
                }
                .price {
                    strong {
                        color: rgb(240,20,20);
                        font-weight: 700;
                        font-size: 14px;
                        span {
                            font-size: 10px;
                        }
                    }
                    del {
                        color: rgb(147,153,159);
                        font-weight: 700;
                        font-size: 10px;
                    }
                }
                .ele-buy{
                    position: absolute;
                    right : 0;
                    bottom: 0;
                }
            }
        }
    }
}
</style>
