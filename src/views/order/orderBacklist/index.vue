<template>
  <div style="padding:30px;">
    <el-card :body-style="{ padding: '30px' }">
      <div slot="header">
        <span>退货商品:</span>
        <el-table style="width: 100%" />
      </div>
      <!-- card body -->
      <div v-if="list.product" border="1">
        <table cellspacing="0" cellpadding="20" border="1" style="width:100%;">
          <tr>
            <th>商品图片</th>
            <th>商品描述</th>
            <th>价格/货号</th>
            <th>商品属性</th>
            <th>数量</th>
            <th>小计</th>
          </tr>
          <tr>
            <td>
              <img :src="list.product.cover_img" alt="" style="width:150px; heigth:150px;">
            </td>
            <td>
              <p>{{ list.product.gname }}</p>
              <p>品牌:{{ list.product.brandName +'|' +list.product.brandEname }}</p>
              <p>{{ list.product.gdescr }}</p>
            </td>
            <td>
              <p>价格:￥{{ list.product.sku_price/100 }}</p>
              <p>货号:{{ list.product.sku_code }}</p>
            </td>
            <td>
              <p>{{ list.product.color_text }}</p>
            </td>
            <td>
              <p>{{ list.count }}</p>
            </td>
            <td>
              <p>￥{{ list.product.sku_price/100 }}</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="tab" style=" margin-top: 30px;">
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>退单单号:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ id }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>当前状态:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ odertext }}:{{ list.process }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>订单编号:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ list.orderId }} <el-button type="text" @click="go(list.orderId )">点击查看</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>申请时间:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ list.addtime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>用户账号:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ list.sendUser }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>退单理由:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ list.reason }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab" :span="24" />
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>联系人:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>{{ list.sendUser }}</span>
          </el-col>
          <el-col class="tab haed" :span="4">
            <span>联系电话:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>{{ list.tel }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>收货地址:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>{{ list.cityStr }}</span>
          </el-col>
          <el-col class="tab haed" :span="4">
            <span>邮编:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>40001</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>详细地址:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <span>{{ list.cityBak }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab" :span="24" />
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>订单金额:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>￥{{ list.order_price }}</span>
          </el-col>
          <el-col class="tab haed" :span="4">
            <span>确认退款金额:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>￥
              <el-input-number v-model="back_price" size="small" :min="1" :max="10" label="描述文字" @change="handleChange" />
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab" :span="24" />
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>处理备注:</span>
          </el-col>
          <el-col class="tab" :span="20">
            <el-input v-model="bak" placeholder="通过/拒绝的处理信息" />
          </el-col>
        </el-row>
        <el-row style="padding:30px;">
          <el-col :span="24">处理结果</el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>处理备注:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span />
          </el-col>
          <el-col class="tab haed" :span="4">
            <span>处理时间:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>{{ list.handletime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tab haed" :span="4">
            <span>处理备注:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span />
          </el-col>
          <el-col class="tab haed" :span="4">
            <span>处理时间:</span>
          </el-col>
          <el-col class="tab" :span="8">
            <span>{{ list.handletime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="height:40px;" :span="24" />
        </el-row>
      </div>
    </el-card>
    <div class="but">
      <el-button v-if="list.process == 0" @click="rejectBack">拒绝退货</el-button>
      <el-button v-if="list.process == 0" type="primary" @click="agreeBack">同意退货</el-button>
      <el-button v-if="list.process == 1" type="primary" @click="backDone">收到退货</el-button>

    </div>
  </div>
</template>

<script>
import api from '@/api/order/orderBack'
export default {
  data() {
    return {
      list: [],
      id: '',
      back_price: '',
      bak: ''
    }
  },
  computed: {
    odertext() {
      var processText = ''
      switch (this.list.process) {
        case '0':
          processText = '等待处理'
          break
        case '1':
          processText = '确认退货,等待收货'
          break
        case '2':
          processText = '确认收货,已退款'
          break
        case '9':
          processText = '拒绝退货'
          break

        default:
          break
      }
      return processText
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getlist()
  },
  methods: {
    getlist() {
      api.detail({ id: this.id }).then(res => {
        this.list = res.data
        console.log('获取的数据 ===>', this.list)
      })
    },
    handleChange(value) {
      console.log(value)
    },
    rejectBack() {
      // 拒绝退货按钮
      var data = {
        bak: this.bak,
        id: this.id
      }
      this.$confirm('此操作将拒绝退货, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.rejectBack(data).then(res => {
          if (res.code == 'success') {
            location.reload()
          } else {
            this.$message.error('发送失败!')
          }
        })
        this.$message({
          type: 'success',
          message: '拒绝成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消拒绝'
        })
      })
    },
    agreeBack() { // 同意退款
      var data = {
        bak: this.bak,
        id: this.id,
        back_price: this.back_price
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.agreeBack(data).then(res => {
          if (res.code == 'success') {
            location.reload()
          } else {
            this.$message.error('发送失败!')
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    backDone() {
      var data = {
        bak: this.bak,
        id: this.id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.backDone(data).then(res => {
          if (res.code == 'success') {
            location.reload()
          } else {
            this.$message.error('发送失败!')
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    go(orderId) {
      this.$router.push({ name: 'detail', params: { id: orderId }})
    }
  }
}
</script>
<style lang="scss" scoped>
table,
td,
th {
  border: 1px solid #ebeef5;
  text-align: center;
}
.haed {
  background-color: #f5f7fa;
  color: #666;
}
.tab {
  border: 1px solid #ebeef5;
  height: 40px;
  line-height: 40px;
  span {
    margin-left: 30px;
  }
}
.but {
  width: 50%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
</style>
