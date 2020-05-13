<template>
  <div class="box">
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>账户列表</span>

      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column fixed type="index" width="50" align="center" />
        <el-table-column fixed label="头像" width="200" align="center">
          <template slot-scope="scope" align="center">
            <img :src="scope.row.avatar" alt="" style="width: 100px;height: 100px;margin: 0 auto;">
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="200" align="center" />
        <el-table-column label="用户昵称" prop="nickname" width="180" align="center" />
        <el-table-column label="用户密码" prop="password" width="180" align="center" />
        <el-table-column label="密码2" prop="password2" width="220" align="center" />
        <el-table-column label="电话" prop="tel" width="240" align="center" />
        <el-table-column label="id" prop="id" width="240" align="center" />
        <el-table-column label="添加时间" prop="addTime" width="220" align="center" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" style="color:red;" @click="dellist(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <MyPagination :page="page" align="right" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />
      </div>

    </el-card>

    <!-- 弹窗 -->

  </div>
</template>

<script>
import api from '@/api/auth/index'
import MyPagination from '@/components/MyPagination'

export default {
  components: {
    MyPagination
  },
  data() {
    return {
      list: [],
      flag: false,
      form: {
        coverImg: []
      },
      page: {
        start: 1,
        limit: 10
      }

    }
  },
  created() {
    this.getsortList()
  },
  methods: {
    getsortList() { // 获取数据
      var data = {
        ...this.page
      }

      api.userList(data).then(res => {
        console.log('获取数据 ==>', res)
        this.list = res.data.list
        this.page = {
          start: res.data.pageNumber,
          limit: res.data.pageSize,
          totalCount: res.data.totalRow
        }
      })
    },
    add() { // 添加按钮
      this.flag = true
    },

    handleSizeChange(v) {
      this.page.limit = v
      this.getsortList()
    },
    handleCurrentChange(v) {
      this.page.start = v
      this.getsortList()
    },
    dellist(id) { // 删除按钮
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        api.userDetail({ id }).then(res => {
          if (res.code === 'S') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getsortList()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 30px;
}
</style>
