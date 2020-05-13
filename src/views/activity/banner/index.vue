<template>
  <div style="margin:30px;">
    <el-card :body-style="{ padding: '30px' }" class="el-banner-box">
      <div slot="header">
        <span>banner轮播 {{ valu }}</span>
        <div class="but">
          <el-button size="mini" type="primary" @click="add">+ 新增</el-button>
          <el-button size="mini" type="danger" @click="del">- 删除</el-button>
        </div>
      </div>
      <!-- 轮播 -->
      <div class="block">
        <el-carousel height="500px " :autoplay="false" trigger="click" @change="handleChange">
          <el-carousel-item v-for="item in list" :key="item.id">
            <el-image style="width: 100%; height: 100%" :src="item.img_url" />
          </el-carousel-item>
        </el-carousel>
      </div>

    </el-card>

    <!-- 轮播弹窗 -->
    <el-dialog title="轮播首页" :visible.sync="falg" width="50%" :before-close="handleClose">
      <div class="img">
        <img :src="form.img_url" alt="">
      </div>
      <div class="upload">
        <el-upload class="upload-demo" drag action="http://www.bufantec.com/api/leju/admin/material/uploadAndSaveImg" :on-success="success" multiple>
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <el-form ref="form" :model="form" label-width="80px" style="margin-top:30px;">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="超链接">
              <el-input v-model="form.link" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型">
              <span> 轮播首页 </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="轮播排序">
              <el-input-number v-model="form.sort" :min="1" :max="999" label="数字越大越靠前" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否显示">
              <el-switch
                v-model="ad"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dels">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/activity/index'

export default {
  data() {
    return {
      list: [],
      valu: '',
      falg: false,
      bannerindex: Number,
      form: {
        img_url: '',
        sort: 0,
        link: ''
      },
      ad: 0

    }
  },
  created() {
    this.getlist()
  },
  methods: {
    dels() {
      this.falg = false
      this.form = {
        img_url: '',
        sort: 0,
        link: ''
      }
      location.reload()
    },
    getlist() {
      api.List().then(res => {
        this.list = res.data
      })
    },
    add() {
      // banner新增按钮
      this.falg = true
    },
    del() {
      // banner删除按钮
      var num = this.bannerindex
      var data = this.list
      var id = data[num].id
      api.bannerDelete({ id }).then(res => {
        if (res.code === 'S') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getlist()
        } else {
          this.$message('失败')
        }
      })
    },
    success(response) { // 图片上传成功钩子
      this.form.img_url = response.ossUrl
    },
    handleChange(index) {
      this.bannerindex = index
    },
    handleClose(done) {
      // 弹出层关闭逻辑
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = {}
          done()
        })
        .catch(_ => {})
    },
    save() {
      var data = this.form
      api.bannerSave(data).then(res => {
        if (res.code === 'S') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })

          this.flag = false
          location.reload()
        } else {
          this.$message('失败')
        }
      })
    }

  }
}
</script>

<style>
.el-banner-box {
  width: 60%;
  margin: 30px auto;
}
.but {
  float: right;
}
.upload {
  display: flex;
  justify-content: center;
  text-align: center;
}
.img{
  width: 200px;
  height: 200px;
  border: 1px solid ;
  margin: 0 auto;
}
</style>
