<template>
  <div class="box-el">
    <!-- 顶部搜索 -->
    <el-card class="top-box-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <input type="text">
      <input type="text">
      <input type="text">
      <input type="text">

    </el-card>

    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
        <el-button style="float: right;" size="small" type="primary" @click="add">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column fixed type="index" width="50" align="center" />
        <el-table-column fixed prop="date" label="商品图片" width="200" align="center">
          <template slot-scope="scope" align="center">
            <img :src="scope.row. cover_img" alt="" style="width: 100px;height: 100px;margin: 0 auto;">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="260" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.gname }} </p>
            <p>品牌:{{ scope.row.brandName +"|" +scope.row.brandEname }} </p>
            <p>{{ scope.row.descr }} </p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="220" align="center">
          <template slot-scope="scope">
            <ul>
              <li>
                <el-switch
                  v-model="scope.row.isshow"
                  :active-value="1"
                  :inactive-value="0"
                  inactive-text="上架:"
                  @change="switchs(scope.row.id,scope.row.isshow,'isshow')"
                />
              </li>
              <li>
                <el-switch
                  v-model="scope.row.ishot"
                  :active-value="1"
                  :inactive-value="0"
                  inactive-text="最热:"
                  @change="switchs(scope.row.id,scope.row.ishot,'ishot')"
                />
              </li>
              <li>
                <el-switch
                  v-model="scope.row.isnew"
                  :active-value="1"
                  :inactive-value="0"
                  inactive-text="最新:"
                  @change="switchs(scope.row.id,scope.row.isnew,'isnew')"
                />
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="价格货号" width="300" align="center">
          <template slot-scope="scope">
            <ul>
              <li> 价格: 💴{{ scope.row.price_now *0.01 }} </li>
              <li> 货号:{{ scope.row.pcode }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="300" align="center">
          <template slot-scope="scope">
            {{ scope.row.ctitles }}
          </template>
        </el-table-column>
        <el-table-column label="查看sku" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="open(scope.row.id)">查看sku</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="130" align="center" />
        <el-table-column prop="origin_city" label="原产地" width="200" align="center" />
        <el-table-column prop="addtime" label="添加时间" width="200" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="opender(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <MyPagination :page="startlist" align="right" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="提示" :visible.sync="dialog" width="60%" :before-close="handleClose">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" align="center">
          <el-table-column prop="color_text" label="颜色" width="180" align="center" />
          <el-table-column prop="color" label="色值" width="180" align="center" />
          <el-table-column label="suk编码" width="180" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sku_code" align="center" />
            </template>
          </el-table-column>
          <el-table-column label="价格" width="180" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" align="center" />
            </template>
          </el-table-column>
          <el-table-column label="库存" width="180" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count" align="center" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialog = false">确 定</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>

<script>

import goods from '@/api/goods/list'
import sku from '@/api/sku/index'
import MyPagination from '@/components/MyPagination'
export default {
  components: {
    MyPagination
  },
  data() {
    return {
      list: [],
      tableData: '',
      startlist: {
        start: 1,
        limit: 10

      },
      dialog: false

    }
  },
  created() {
    this.gitlist()
  },
  methods: {
    gitlist() {
      var obj = {
        ...this.startlist
      }
      goods.goodsList(obj).then(res => {
        this.list = res.data.list
        this.startlist = {
          start: res.data.pageNumber,
          limit: res.data.pageSize,
          totalCount: res.data.totalRow
        }
        console.log(this.list)
        console.log('page ==>', res)
      })
    },
    switchs(id, n, c) {
      var a = {
        id
      }
      a[c] = n
      goods.updateProduct(a).then(res => {
        if (res.code) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.gitlist()
        } else {
          this.$message('添加失败')
        }
      })
    },
    open(id) {
      sku.skuList({ productId: id }).then(res => {
        this.tableData = res.data
        this.dialog = true
      })
    },
    edit(e) { // sku 编辑
      sku.saveOrUpdate(e)
        .then(res => {
          if (res.code == 'success') {
            this.$message.success('更新成功!')
          } else {
            this.$message.error('更新失败!')
          }
        })
    },
    add() {
      this.$router.push({ name: 'productAdd' })
    },
    opender(id) {
      this.$router.push({ name: 'productEdit', params: { id }})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSizeChange(v) {
      console.log(v)
      this.startlist.limit = v
      this.gitlist()
    },
    handleCurrentChange(v) {
      this.startlist.start = v
      this.gitlist()
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  margin-top: 5px;
}
.box-el {
  margin: 30px;
  .top-box-card {
    padding: 20px;
  }
  .list-card {
    margin-top: 30px;
  }
}
</style>

