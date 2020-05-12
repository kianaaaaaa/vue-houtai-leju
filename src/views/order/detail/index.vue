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
        <span v-if="orderBaseInfo.statusend == '0'" style="color: green;">订单处理中...</span>
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
        <span>￥{{ mub }}</span>
      </div>

      <div style="margin-top:50px; width:100%;">
        <span>费用信息:</span>
        <div class="el-row">
          <el-col v-for="(v,key) in cost" :key="key" :span="6">
            <div class="table-cell-head">
              <span>{{ key }}</span>
            </div>
            <div class="table-cell-body">
              <span>{{ v }}</span>
            </div>
          </el-col>
        </div>
      </div>

      <div style="margin-top:50px; width:100%;">
        <span>申请退款:</span>
        <div class="el-row">
          <el-col v-for="(v,key) in refund" :key="key" :span="6">
            <div class="table-cell-head">
              <span>{{ key }}</span>
            </div>
            <div class="table-cell-body">
              <span>{{ v }}</span>
            </div>
          </el-col>
        </div>
      </div>
    </el-card>
    <div style="margin:30px auto 60px; text-align: center;">
      <el-button v-if="step==1" type="primary" @click="sendDone">已发货</el-button>
      <el-button v-if="step==2" disabled type="primary">等待客户收货...</el-button>
      <el-button v-if="step==3" type="primary" @click="closeOrder">关闭订单</el-button>
    </div>

  </div>
</template>

<script>
import api from '@/api/order/index'
export default {
  data() {
    return {
      list: [],
      orderBaseInfo: [],
      userInfo: [],
      id: ''
    }
  },
  computed: {
    orderBaseInfoCom() {
      return {
        订单编号: '数据错误' || this.orderBaseInfo.orderId,
        用户账号: '数据错误' || this.orderBaseInfo.username,
        订单金额: '数据错误' || this.orderBaseInfo.price,
        订单数量: '数据错误' || this.orderBaseInfo.count,
        订单状态: '数据错误' || this.orderBaseInfo.status,
        是否关闭: '数据错误' || this.orderBaseInfo.statusend,
        下单时间: '数据错误' || this.orderBaseInfo.addTime,
        发货时间: '数据错误' || this.orderBaseInfo.sendTime,
        收货时间: '数据错误' || this.orderBaseInfo.receiveTime,
        退单时间: '数据错误' || this.orderBaseInfo.backTime,
        结束时间: '数据错误' || this.orderBaseInfo.endTime,
        其他: ''
      }
    },
    userInfoCom() {
      return {
        收货人: '数据错误' || this.userInfo.username + '(' + this.userInfo.NAME + ')',
        手机号码: '数据错误' || this.userInfo.tel,
        邮政编码: '41000',
        地市: '数据错误' || this.userInfo.cityStr,
        详细地址: '数据错误' || this.userInfo.cityBak,
        邮箱: '数据错误' || this.userInfo.email
      }
    },
    cost() {
      return {
        商品合计: this.mub,
        运费: 20,
        订单金额: this.mub,
        实际付款: this.mub + 20
      }
    },
    refund() {
      return {
        申请人: '展示',
        退款金额: 20,
        退款商品: '娃娃',
        申请时间: new Date().getFullYear() + '/' + new Date().getMonth() + '/' + new Date().getDate()
      }
    },
    mub() {
      var a = []
      this.list.forEach(item => {
        a.push(item.price / 100 * (item.count))
      })
      if (a.length > 0) {
        a = a.reduce((a, b) => {
          return a + b
        })
      }
      return a
    },
    step() {
      // 是否订单被关闭 跟statusend 有关
      if (this.orderBaseInfo.statusend == '1') { return 4 }

      return (this.orderBaseInfo.orderStatus - 0) || 1
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
        console.log('mmm', this.orderBaseInfo)
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
    sendDone() {
      api.sendDone({ id: this.orderBaseInfo.orderId }).then(res => {
        if (res.code == 'S') {
          window.location.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeOrder() {

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
  .price-sum{
    margin-top: 30px;
    float: right;
  }
}
</style>
