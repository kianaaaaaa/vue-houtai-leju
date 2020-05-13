<template>
  <div class="box">
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>品牌管理</span>
        <el-button style="float: right;" size="small" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column fixed type="index" width="50" align="center" />
        <el-table-column fixed prop="date" label="商品图片" width="200" align="center">
          <template slot-scope="scope" align="center">
            <img :src="scope.row.ossUrl" alt="" style="width: 100px;height: 100px;margin: 0 auto;">
          </template>
        </el-table-column>
        <el-table-column label="图片名称" prop="fileName" width="180" align="center" />
        <el-table-column label="图片地址" prop="fullPath" width="180" align="center" />
        <el-table-column label="ossUrl地址" prop="ossUrl" width="220" align="center" />
        <el-table-column label="id" prop="id" width="240" align="center" />
        <el-table-column label="添加时间" prop="addTime" width="220" align="center" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="text" @click="opender(scope.row.id)">编辑</el-button> -->
            <el-button size="small" type="text" style="color:red;" @click="dellist(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <MyPagination :page="page" align="right" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />
      </div>

    </el-card>

    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="flag"
      width="50%"
      :before-close="handleClose"
      style="padding:30px;"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="图片">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="http://www.bufantec.com/api/leju/admin/material/uploadAndSaveImg"
                :on-success="detailImgsSuccess"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                <div slot="tip" class="el-upload__tip">只能上传jpg/png,不超过500kb,最多4张图片</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <img style="width:120px;height:120px;" :src="form.coverImg">
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/material/index'
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

      api.materialList(data).then(res => {
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
    opender() { // 编辑按钮
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = {}
          done()
        })
        .catch(_ => {})
    },
    detailImgsSuccess(response, file) {
      console.log(response)
      this.form.coverImg = response.ossUrl
    },
    dellist(id) { // 删除按钮
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        api.del({ id }).then(res => {
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
