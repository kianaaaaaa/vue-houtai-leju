<template>
  <div class="box">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <div class="box-title">
        <el-row :gutter="30">
          <el-col :span="4.8">
            <el-input v-model="Status.orderId" size="small" placeholder="订单模糊查询" />
          </el-col>
          <el-col :span="4.8">
            <el-input v-model="Status.userId" size="small" placeholder="用户名id模糊查询" />
          </el-col>
          <el-col :span="4.8">
            <!-- <el-input size="small" placeholder="请输入内容" /> -->
            <el-select v-model="Status.statusend" size="small" placeholder="订单状态">
              <el-option value="1" label="已关闭" />
              <el-option value="0" label="正在进行" />
            </el-select>
          </el-col>
          <el-col :span="4.8">
            <el-select v-model="Status.process" size="small" placeholder="请选择">
              <el-option v-for="(v,key) in orderStatusObj" :key="v" :label="v" :value="key" />
            </el-select>
          </el-col>
          <el-col :span="4.8">
            <div>
              <el-button size="small" type="primary" @click="Inquire">搜索</el-button>
              <el-button size="small" type="primary" @click="Reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '30px'}" style="margin-top:30px;">
      <el-table :data="list" border stripe style="width: 100%">
        <el-table-column fixed type="index" width="50" />
        <el-table-column fixed prop="orderId" label="订单编号" width="240" align="center" />
        <el-table-column prop="addtime" label="申请时间" width="240" align="center" />
        <el-table-column prop="username" label="用户账号" width="180" align="center" />
        <el-table-column prop="order_price" label="订单金额" width="180" align="center" />
        <el-table-column prop="count" label="订单数量" width="180" align="center" />
        <el-table-column prop="statusend" label="订单状态" width="180" align="center">
          <template slot-scope="scope"> {{ scope.row.statusend == 0 ? '正在进行':'以结束' }}
          </template>
        </el-table-column>
        <el-table-column prop="handletime" label="完成时间" width="180" align="center" />
        <el-table-column fixed="right" prop="name" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit( scope.row.backId)"
            >查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <MyPagination :page="page" align="right" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />
      </div>
    </el-card>

  </div>
</template>

<script>
import api from '@/api/order/orderBack'
import MyPagination from '@/components/MyPagination'

export default {
  components: {
    MyPagination
  },
  data() {
    return {
      Status: {},
      list: [],
      page: {
        start: 1,
        limit: 10
      }
    }
  },
  computed: {
    orderStatusObj() {
      return {
        '0': '等待处理',
        '1': '确认退货,等待收货; ',
        '2': '确认收货,已退款 ',
        '9': '拒绝退'
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() { // 获取数据
      var data = {
        orderId: this.Status.orderId,
        process: this.Status.process,
        statusend: this.Status.statusend,
        userId: this.Status.userId,
        ...this.page
      }

      api.orderBack(data).then(res => {
        this.list = res.data.list
        console.log(res)
        this.page = {
          start: res.data.pageNumber,
          limit: res.data.pageSize,
          totalCount: res.data.totalRow
        }
      })
    },
    handleEdit(id) { // 查看订单
      console.log(id)
      this.$router.push({ name: 'orderBacklist', params: { id }})
    },
    handleSizeChange(v) {
      this.page.limit = v
      this.getlist()
    },
    handleCurrentChange(v) {
      this.page.start = v
      this.getlist()
    },
    Inquire() { // 搜索
      this.getlist()
      this.Status = {}
    },
    Reset() { // 重置
      this.Status = {}
      this.getlist()
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 30px;
  &-title {
    padding: 20px;
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }
}
</style>
