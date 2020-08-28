<template>
  <div>
    <a-card :bordered="false">
        <a-form layout="inline">
          <a-row>
            <a-col :span="20">
              <a-form-item label="商品">
                <a-input placeholder="请输入" v-model="queryParam.title" allowClear/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchGoods">查询</a-button>
            </span>
            </a-col>
          </a-row>

          <div v-for="(good,index) in goods" :key="index">
            <div style="width: 200px;height: 200px">
              <img :src="good.img" width="100%">
            </div>
            <!--价格-->
            <p>
              <em><b>{{good.price}}</b></em>
            </p>
            <!--标题-->
            <p>
              <a v-html="good.title"></a>
            </p>
          </div>

        </a-form>
    </a-card>
  </div>
</template>

<script>
import { search,searchHighLight } from '@/api/search/search'

export default {
  data () {
    return {
      goods: [],
      queryParam: {
      }
    }
  },
  methods: {
    searchGoods(){
      searchHighLight(this.queryParam.title).then(res => {
        this.goods = res;
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
