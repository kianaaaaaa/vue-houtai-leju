<template>
  <div class="box">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <div class="box-title">
        <el-row :gutter="100">
          <el-col :span="6">
            <el-input v-model="Status.name" :value="Status.name" size="small" placeholder="用户名模糊查询" />
          </el-col>
          <el-col :span="6">
            <!-- <el-input size="small" placeholder="请输入内容" /> -->
            <el-select v-model="Status.status" size="small" placeholder="请选择">
              <el-option value="0">正在进行</el-option>
              <el-option value="1">已关闭</el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="Status.statusend" size="small" placeholder="请选择">
              <el-option v-for="(v,key) in orderStatusObj" :key="v" :label="v" :value="key" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <div>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

    </el-card>
    <el-card :body-style="{ padding: '30px'}" style="margin-top:30px;">
      <div slot="header" style="height:30px;">

        <div slot="header" class="clearfix">
          <span>商品列表</span>
          <el-button style="float: right;" size="small" type="primary">添加</el-button>
        </div>

      </div>

      <el-table :data="list" border stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" label="文章标题" width="240" align="center" />
        <el-table-column prop="author" label="作者" width="240" align="center" />
        <el-table-column prop="username" label="文章分类" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.kindCTitle }}</span> /
            <span>{{ scope.row.kindETitle }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="颜色分类" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.color1" class="item-color-block" :style="{backgroundColor:scope.row.color1}" />
            <span v-if="scope.row.color2" class="item-color-block" :style="{backgroundColor:scope.row.color2}" />
            <span v-if="scope.row.color3" class="item-color-block" :style="{backgroundColor:scope.row.color3}" />
          </template>
        </el-table-column>
        <el-table-column prop="count" label="封面图片" width="180" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.coverImg" :src="scope.row.coverImg" alt="" style="width:100px; height:100px;">
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="阅读量/赞" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.viewCount }}/
            {{ scope.row.zanCount }}
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间" width="180" align="center" />

        <el-table-column fixed="right" prop="name" label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit( scope.row.orderId)">查看</el-button>
            <el-button size="mini" type="primary" @click="edit( scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delet( scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <MyPagination
          :page="page"
          align="right"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 弹窗组件 -->
    <el-dialog title="编辑" :visible.sync="flag" width="80%" style="padding:30px;">
      <el-form :model="form">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者">
              <el-input v-model="form.author" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="摘要">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="封面图片">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-upload
                action="http://www.bufantec.com/api/leju/admin/material/uploadImg"
                :on-success="detailImgsSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <img style="width:120px;height:75px;object-fit:contain" :src="form.coverImg" alt>
            </el-col>
            <el-col :span="4">
              <el-button v-if="form.coverImg" style="color:red" type="text" @click="delImg">删除</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px;">
            <el-col :span="6">
              <el-form-item label="显示文章">
                <el-switch
                  v-model="form.canShow"
                  active-color="#13ce66"
                  inactive-color="#e5e5e5"
                  :active-value="1"
                  :inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否最热">
                <el-switch
                  v-model="form.hot"
                  active-color="#13ce66"
                  inactive-color="#e5e5e5"
                  :active-value="0"
                  :inactive-value="1"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="文章显示封面">
                <el-switch
                  v-model="form.coverShow"
                  active-color="#13ce66"
                  inactive-color="#e5e5e5"
                  :active-value="0"
                  :inactive-value="1"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="外联">
                <el-switch
                  v-model="form.original"
                  active-color="#13ce66"
                  inactive-color="#e5e5e5"
                  :active-value="0"
                  :inactive-value="1"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="添加">
              <el-input v-model="vlau" placeholder="请输入色值" />
              <el-button type="text" @click="addcolor">添 加</el-button>
              <el-button type="text" @click="addcolor1">生 成</el-button>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="颜色">
              <span v-for="item in colors" :key="item" class="item-color-block" :style="{backgroundColor:item}" />

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="颜色">
              <span v-if="form.color1" class="item-color-block" :style="{backgroundColor:form.color1}" />
              <span v-if="form.color2" class="item-color-block" :style="{backgroundColor:form.color2}" />
              <span v-if="form.color3" class="item-color-block" :style="{backgroundColor:form.color3}" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/material/article'
import MyPagination from '@/components/MyPagination'

export default {
  components: {
    MyPagination
  },
  data() {
    return {
      Status: [],
      list: [],
      page: {
        start: 1,
        limit: 10
      },
      flag: false,
      form: {
        coverImg: []

      },
      vlau: '', // 动态颜色
      colors: [] // 存储颜色
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
    getlist() {
      // 获取数据
      var data = {
        ...this.page
      }

      api.list(data).then(res => {
        this.list = res.data.list
        console.log(res)
        this.page = {
          start: res.data.pageNumber,
          limit: res.data.pageSize,
          totalCount: res.data.totalRow
        }
      })
    },
    handleEdit(id) {
      // 查看订单
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
    edit(id) { // 编辑按钮
      this.flag = true
      if (id) {
        api.detail({ id }).then(res => {
          this.form = res.data
        })
      }
    },
    delImg() { // 图片删除
      this.form.coverImg = []
    },
    detailImgsSuccess(response) { // 上传图片钩子函数
      this.form.coverImg = response.ossUrl
      console.log(this.form)
    },
    addcolor() { // 添加颜色
      this.colors.push(this.vlau)
      this.vlau = ''
    },
    addcolor1() { // 生成颜色
      var add = this.colors
      for (let i = 0; i < add.length; i++) {
        const element = add[i]
        this.form['color' + (i + 1)] = element
      }
      console.log(this.form)
    },
    save() { // 保存按钮
      var obj = this.form
      api.saveOrUpdate(obj).then(res => {
        if (res.code === 'S') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })

          this.flag = false
          this.getlist()
        } else {
          this.$message('失败')
        }
      })
    },
    cancel() { // 取消按钮
    // 取消时清空存储数据
      this.form = {}
      this.colors = []
      this.flag = false
    },
    delet(id) { // 删除按钮
      api.del({ id }).then(res => {
        if (res.code === 'S') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getlist()
        } else {
          this.$message('删除失败')
        }
      })
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
.item-color-block {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: inline-block;
}
</style>
