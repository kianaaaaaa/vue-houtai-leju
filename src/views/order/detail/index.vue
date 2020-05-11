<template>
  <div class="box">
    <el-card :body-style="{ padding: '30px' }">

      <el-steps :active="step" finish-status="success" class="step">
        <el-step title="已付款" />
        <el-step title="已发货" />
        <el-step title="已收款" />
        <el-step title="已关闭" />
      </el-steps>
    </el-card>
    <el-card :body-style="{ padding: '30px' }" style="margin-top:30px;">
      <div slot="header">
        <span>当前订单状态</span>
      </div>
      <span>基本信息</span>
      <div class="el-row">
        <el-col v-for="(v,key) in orderBaseInfoCom" :key="key" :span="4">
          <div class="table-cell-head">
            <span>{{ key }}</span>
          </div>
          <div class="table-cell-body">
            <span>{{ v }}</span>
          </div>
        </el-col>
      </div>
      <div style="margin-top:30px;">
        <span>收货人信息</span>
        <div class="el-row">
          <el-col v-for="(v,key) in userInfoCom" :key="key" :span="4">
            <div class="table-cell-head">
              <span>{{ key }}</span>
            </div>
            <div class="table-cell-body">
              <span>{{ v }}</span>
            </div>
          </el-col>
        </div>
      </div>
      <div style="margin-top:30px;">
        <span>商品信息</span>
        <el-table style="margin-top:30px;" :data="list" border stripe>
          <el-table-column fixed="" type="index" width="60" align="center" />
          <el-table-column align="center" prop="gname" label="商品图片" :width="180">
            <template slot-scope="scope">
              <el-image class="cover-img" :src="scope.row.cover_img" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品名称" :width="380">
            <template slot-scope="scope">
              <p>{{ scope.row.gname }}</p>
              <p>品牌: {{ scope.row.brandName }} | {{ scope.row.brandEname }}</p>
              <p>{{ scope.row.descr }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="价格货号" :width="380">
            <template slot-scope="scope">
              <p>价格: ￥{{ scope.row.price/100 }}</p>
              <p>货号:{{ scope.row.sku_code }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="型号" :width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.color_text }}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="count" label="数量" :width="180" />
          <el-table-column align="center" prop="count" label="小计" :width="180">
            <template slot-scope="scope">
              <p>￥{{ scope.row.price/100*(scope.row.count) }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="price-sum">
        合计:
        <span>￥{{ 500 }}</span>
      </div>
    </el-card>

  </div>
</template>

<script>
import api from '@/api/order/index'
export default {
  data() {
    return {
      step: 1,
      list: [],
      orderBaseInfo: [],
      userInfo: [],
      id: ''
    }
  },
  computed: {
    orderBaseInfoCom() {
      return {
        订单编号: this.orderBaseInfo.orderId,
        用户账号: this.orderBaseInfo.username,
        订单金额: this.orderBaseInfo.price,
        订单数量: this.orderBaseInfo.count,
        订单状态: this.orderBaseInfo.status,
        是否关闭: this.orderBaseInfo.statusend,
        下单时间: this.orderBaseInfo.addTime,
        发货时间: this.orderBaseInfo.sendTime,
        收货时间: this.orderBaseInfo.receiveTime,
        退单时间: this.orderBaseInfo.backTime,
        结束时间: this.orderBaseInfo.endTime,
        其他: ''
      }
    },
    userInfoCom() {
      return {
        收货人: this.userInfo.username + '(' + this.userInfo.NAME + ')',
        手机号码: this.userInfo.tel,
        邮政编码: '41000',
        地市: this.userInfo.cityStr,
        详细地址: this.userInfo.cityBak,
        邮箱: this.userInfo.email
      }
    },
    mub() {

    }
  },
  created() {
    this.id = this.$route.params.id
    this.getlist()
  },
  methods: {
    getlist() {
      var data = {
        orderId: this.id
      }
      api.orderList(data).then(res => {
        this.orderBaseInfo = res.data.list[0]
      })
      api.orderUserInfo(data).then(res => {
        this.userInfo = res.data
      })
      api.detail(data).then(res => {
        console.log(res.data)

        this.list = res.data
        console.log(this.list)
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 30px;
  .el-row {
    box-sizing: border-box;
    margin-top: 30px;
    .table-cell-head {
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      font-size: 14px;
      text-align: center;
      color: #666;
      background-color: #f5f7fa;
    }
    .table-cell-body {
      height: 60px;
      line-height: 60px;
      color: #606266;
      overflow: hidden;
      text-align: center;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
    }
  }
}
</style>
