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
        <el-table-column label="中文标题" prop="ctitle" width="180" align="center" />
        <el-table-column label="英文标题" prop="etitle" width="180" align="center" />
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

    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="flag"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="轮播图">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="http://www.bufantec.com/api/leju/admin/material/uploadImg"
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
            <img style="width:120px;height:120px;" :src="form.img">
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="中文标题">
              <el-input v-model="form.ctitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文标题">
              <el-input v-model="form.etitle" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="Update">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import sortApi from '@/api/product/sort'
export default {
  data() {
    return {
      list: [],
      flag: false,
      form: {
        img: []
      },
      onimg: ''
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
      this.flag = true
    },
    opender(id) { // 编辑按钮
      this.flag = true
      this.form.id = id
      var obj = ''
      if (this.form.id) {
        obj = this.list.filter(item => {
          return item.id == id
        })
      }
      this.form = obj[0]
    },
    Update() { // 保存提交
      this.flag = false
      console.log(this.form)
      sortApi.saveOrUpdate(this.form).then(res => {
        if (res.code === 'S') {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getsortList()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    detailImgsSuccess(response, file) {
      console.log(response, file)
      this.form.img = response.ossUrl
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
