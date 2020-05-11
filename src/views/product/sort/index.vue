<template>
  <div class="box">

    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>分类管理列表</span>
        <el-button style="float: right;" size="small" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column fixed type="index" width="50" align="center" />
        <el-table-column fixed prop="date" label="商品图片" width="200" align="center">
          <template slot-scope="scope" align="center">
            <img :src="scope.row.img" alt="" style="width: 100px;height: 100px;margin: 0 auto;">
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="ctitle" width="180" align="center" />
        <el-table-column label="副标题" prop="etitle" width="180" align="center" />
        <el-table-column label="id" prop="id" width="240" align="center" />
        <el-table-column label="添加时间" prop="addTime" width="220" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="opender(scope.row.id)">编辑</el-button>
            <el-button size="small" type="text" style="color:red;" @click="dellist(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import sortApi from '@/api/product/sort'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getsortList()
  },
  methods: {
    getsortList() { // 获取sort数据
      sortApi.sortList().then(res => {
        console.log('获取数据 ==>', res)
        this.list = res.data
        console.log(this.list)
      })
    },
    add() { // 添加按钮

    },
    opender() { // 编辑按钮
      sortApi.saveOrUpdate().then(res => {
        console.log(res)
      })
    },
    dellist(id) { // 删除按钮
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        sortApi.delList({ id }).then(res => {
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
