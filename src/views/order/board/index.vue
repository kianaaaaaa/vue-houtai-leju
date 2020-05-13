<template>
  <div class="box">

    <!-- 查询条件 -->
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <div class="box-title">
        <el-row :gutter="100">
          <el-col :span="6">
            <el-input v-model="Status.username" size="small" placeholder="用户名模糊查询" />
          </el-col>
          <el-col :span="6">
            <!-- <el-input size="small" placeholder="请输入内容" /> -->
            <el-select v-model="Status.statusend" size="small" placeholder="请选择">
              <el-option value="0" label="已关闭" />
              <el-option value="1" label="正在进行" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="Status.status" size="small" placeholder="请选择">
              <el-option v-for="(v,key) in orderStatusObj" :key="v" :label="v" :value="key" />
            </el-select>
          </el-col>
          <el-col :span="6">
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
        <el-table-column prop="addTime" label="添加时间" width="240" align="center" />
        <el-table-column prop="username" label="用户账号" width="180" align="center" />
        <el-table-column prop="price" label="订单金额" width="180" align="center" />
        <el-table-column prop="count" label="订单数量" width="180" align="center" />
        <el-table-column prop="orderStatus" label="订单状态" width="180" align="center">
          <template slot-scope="scope"> {{ scope.row.sendTime == null ? '已发货: ':'已付款:' }}
            {{ scope.row.orderStatus }}</template>
        </el-table-column>
        <el-table-column prop="payType" label="支付类型" width="180" align="center" />
        <el-table-column prop="statusend" label="是否关闭" width="180" align="center">
          <template slot-scope="scope"> <span
            :class="[scope.row.statusend == 0 ? 'green':'red']"
          >{{ scope.row.statusend == 0 ? '正在进行':'关闭订单' }}
          </span></template>

        </el-table-column>
        <el-table-column prop="sendTime" label="完成时间" width="180" align="center" />
        <el-table-column fixed="right" prop="name" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit( scope.row.orderId)"
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
import api from '@/api/order/index'
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
        '0': '未付款',
        '1': '已付款',
        '2': '已发货',
        '3': '已收货',
        '9': '申请退货'
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() { // 获取数据
      var data = {
        username: this.Status.username,
        status: this.Status.status,
        statusend: this.Status.statusend,
        ...this.page
      }

      api.orderList(data).then(res => {
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
      this.$router.push({ name: 'detail', params: { id }})
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
