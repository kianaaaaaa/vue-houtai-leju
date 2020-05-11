<template>
  <div class="box">
    <el-steps :active="step" finish-status="success" class="step">
      <el-step title="商品基本信息" />
      <el-step title="添加库存信息" />
      <el-step title="添加关联" />
    </el-steps>
    <el-card class="box-card">
      <el-form ref="form" class="form" :model="form" label-width="80px">
        <div v-show="step == 1">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="form.gname" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品牌">
                <el-select v-model="form.brand_id" placeholder="请选择">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.cname" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动名称">
                <el-form-item label="原产地">
                  <el-cascader v-model="selectedCity" size="small" :options="cityOptions" placeholder="原产地" />
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品编码">
                <el-input v-model="form.pcode" size="small" placeholder="商家自定义" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关键词">
                <el-input v-model="form.keywords" size="small" placeholder="不要用逗号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品描述">
                <el-input v-model="form.descr" placeholder="试试搜索：指南" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-upload
                  :action="`http://www.bufantec.com/api/leju/admin/material/uploadImg`"
                  :file-list="fileList"
                  :on-success="coverSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-image class="cover-img" :src="form.cover_img">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </el-col>
          </el-row>

          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="是否上架">
                <el-switch v-model="form.isshow" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最热">
                <el-switch v-model="form.ishot" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否最新">
                <el-switch v-model="form.isnew" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item width="100" label="进价">
                <el-input-number v-model="form.price_in" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="售价">
                <el-input-number v-model="form.price_out" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当前价格">
                <el-input-number v-model="form.price_now" :min="0" />(单位:分)
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item width="100" label="重量">
                <el-input-number v-model="form.weight" :min="0" />(单位:克)
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排序">
                <el-input-number v-model="form.sort" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位名称">
                <el-input v-model="form.unit_name" placeholder="比如:个/辆/台" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品分类">
                <el-checkbox-group v-model="form.kindIds" size="small">
                  <el-checkbox v-for="item in kindList" :key="item.id" :label="item.id">
                    {{ item.ctitle }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="系列">
                <el-select v-model="form.seriesId" size="small" placeholder>
                  <el-option v-for="item in serieslists" :key="item.id" :label="item.cname" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="送货服务">
                <el-checkbox-group v-model="form.service_promise">
                  <el-checkbox :label="0">无</el-checkbox>
                  <el-checkbox :label="1">送货入户</el-checkbox>
                  <el-checkbox :label="2">上门安装</el-checkbox>
                </el-checkbox-group>

              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 第二页 -->
        <div v-show="step == 2">
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="详情标题">
                <el-input v-model="form.detail_title" size="small" placeholder="仙女凳/减肥凳" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="副标题">
                <el-input v-model="form.detail_desc" size="small" placeholder="仙女凳/减肥凳/红色/绿色/黄色/橘黄色" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="轮播图">
                <el-upload
                  action="http://www.bufantec.com/api/leju/admin/material/uploadImg"
                  :on-success="detailImgsSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png,不超过500kb,最多4张图片</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <img v-for="m in form.imgs" :key="m" class="detail-img" :src="m">
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="添加sku">
                <span>颜色:</span>
                <el-checkbox-group v-model="colorSel" size="small">
                  <el-checkbox v-for="item in colorObjList" :key="item.value" :label="item.text">
                    <span :style="{color:item.value}">{{ item.text }}</span>
                    <span style="font-size:12px;" @click="delColor(item.text)">删除</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" />
          </el-row>
          <el-row :gutter="30">
            <el-form-item>
              <el-input v-model="colorObj.text" size="small" style="width:160px" placeholder="颜色描述:比如土豪金" />
              <el-input v-model="colorObj.value" size="small" style="width:160px" placeholder="色值:比如#ff0055" />
              <el-button size="small" type="primary" @click="addColorObj">创建</el-button>
              <div>
                <el-button v-show="colorObjList" type="small" @click="pushSku">生成 </el-button>
                <el-button type="small" @click="delSku">重置 </el-button>

              </div>
              <!-- form表单 -->
              <div>
                <el-table :data="skuData" border style="width: 80%">
                  <el-table-column prop="color_text" label="颜色" align="center" width="120" />
                  <el-table-column prop="color" label="色值" align="center" width="120" />
                  <el-table-column label="sku编码 " align="center" width="220">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sku_code" size="mini" placeholder="自定义sku编码" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="价格" align="center" width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price" size="mini" placeholder="自定义价格/单位分" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="zip" label="库存" align="center" width="110">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.count" size="mini" placeholder="自定义库存" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="zip" label="操作" align="center" width="120">
                    <template slot-scope="scope">
                      <el-button style="color:red" size="mini" type="text" @click="removeSku(scope.row.tempId)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </el-form-item>
          </el-row>
          <!-- 商品描述 -->
          <div>
            <el-form-item label="商品详情">
              <tinymce ref="tin" upload-url="http://bufantec.com/api/leju/admin/material/uploadImg" />
            </el-form-item>

          </div>

        </div>
        <div v-show="step == 3">
          <el-row :gutter="30">
            <el-form-item label="关联商品">
              <el-transfer v-model="filterdata" :titles="['所有商品','选中商品']" :data="data" />

            </el-form-item>
            <el-col :span="12" />
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="form.bak" type="textarea" placeholder="填写备注信息" />
          </el-form-item>

        </div>
        <div class="bottom-but">
          <el-button v-show="step >1" size="small" type="primary" @click="donStep">上一步</el-button>
          <el-button v-show="step <3" size="small" type="primary" @click="nextStep">下一步</el-button>
          <el-button v-show="step == 3" size="small" type="primary" @click="onSubmit(form)">提交保存</el-button>
        </div>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import http from '@/api/host-setting'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import productApi from '@/api/product/index'
import brandApi from '@/api/brand/index'
import kindApi from '@/api/kind/index'
import seriesApi from '@/api/series/index'
export default {
  components: {
    tinymce
  },
  data() {
    return {
      step: 1,
      id: '',
      form: {
        isshow: '',
        kindIds: [],
        service_promise: [],
        cover_img: '',
        imgs: [],
        sku_count: 10,
        attr_img: ''
      },
      selectedCity: [],
      cityOptions: regionDataPlus,
      fileList: [],
      colorSel: [],
      colorObj: [],
      colorObjList: [],
      brandList: [], // 品牌
      skuData: [], // sku集合
      http,
      content: [],
      data: [], // 商品列表
      filterdata: [],
      kindList: [], // 商品分类
      serieslists: [] // 系列
    }
  },
  computed: {},
  created() {
    this.id = this.$route.params.id
    this.skulist()
    this.getBrandlist()
    this.getKindlist()
    this.getSeriesList()
    if (this.id) {
      this.updateId()
    }
  },
  methods: {
    updateId() {
      const id = this.id
      productApi.detail({ id }).then(res => {
        var rs = res.data
        console.log(rs)
        if (rs.imgs !== null) { //  轮播图片格式转换
          if (rs.imgs.indexOf(',') != -1) {
            rs.imgs = rs.imgs.split(',')
          }
        }
        if (rs.kindIds.indexOf(',') != -1) {
          rs.kindIds = rs.kindIds.split(',')
        } else {
          rs.kindIds = [rs.kindIds]
        }
        if (rs.service_promise === 3) {
          rs.service_promise = [1, 2]
        } else {
          rs.service_promise = [rs.service_promise]
        }

        this.form = rs
        this.$refs.tin.setContent(rs.content)

        this.skuData = rs.skuList
        var selectCityUse = []
        if (this.form.origin_code !== '') {
          console.log(this.form.origin_code)
          var a = this.form.origin_code.substr(0, 2)
          var b = this.form.origin_code.substr(2, 2)
          var c = this.form.origin_code.substr(4, 4)

          selectCityUse.push(a + '0000')
          if (b != '00') {
            selectCityUse.push(a + b + '00')
          }
          if (c != '00') {
            selectCityUse.push(a + b + c)
          }
        }
        this.selectedCity = selectCityUse
        // this.setTin(rs.content)
        if (rs.link1.indexOf(',') != -1) {
          this.filterdata = rs.link1.split(',')
        }
      })
    },
    coverSuccess(response, file, fileList) {
      this.form.cover_img = response.ossUrl
    },
    detailImgsSuccess(response) {
      this.form.imgs.push(response.ossUrl)
    },
    donStep() {
      // 上一步按钮
      this.step--
    },
    nextStep() {
      // 下一步按钮
      this.step++
    },
    delColor(text) {
      // 删除
      this.colorObjList = this.colorObjList.filter(item => item.text !== text)
    },
    pushSku() {
      // 生成按钮
      this.skuData = []
      this.colorObjList.forEach(item => {
        this.skuData.push({
          tempId: item.text, // 颜色描述为id
          sku_code: '',
          color_text: item.text,
          color: item.value,
          price: 0,
          count: 0
        })
      })
    },
    removeSku(e) {
      // 删除sku列
      this.skuData = this.skuData.filter(item => item.tempId != e)
    },
    delSku() {
      this.skuData = []
      this.colorSel = []
    },
    addColorObj() {
      // 创建color 颜色对象
      console.log(this.colorSel)
      var newobj = this.colorObj
      this.colorObjList.push(newobj)
      this.colorObj = {}
      // var newobj
    },
    skulist() {
      productApi.productList().then(res => {
        var list = res.data.list
        console.log(res)
        list.forEach(item => {
          this.data.push({
            key: item.id,
            label: item.gname
          })
        })
      })
      console.log(this.data)
    },

    getBrandlist() {
      brandApi.brandListAll().then(res => {
        this.brandList = res.data
      })
    },
    getKindlist() {
      kindApi.kindList().then(res => {
        this.kindList = res.data
      })
      console.log('this.kindList', this.kindList)
    },
    getSeriesList() {
      seriesApi.seriesList().then(res => {
        this.serieslists = res.data
      })
    },
    onSubmit(form) {
      // 提交保存
      for (var i = 0; i < this.skuData.length; i++) {
        this.form['skuList[' + i + ']'] = this.skuData[i]
      }
      this.form.pcode += Date.parse(new Date())

      this.form.content = this.$refs.tin.getContent()
      this.form.link1 = this.filterdata.join(',')
      let city = ''
      let code = ''
      for (let i = this.selectedCity.length - 1; i >= 0; i--) {
        if (this.selectedCity[i] != '') {
          code = this.selectedCity[i]
          break
        }
      }
      city = CodeToText[code]
      this.form.origin_city = city
      this.form.origin_code = code

      if (this.form.service_promise.length === 2) {
        this.form.service_promise = 3
        this.form.service_promise = this.form.service_promise.toString()
      } else {
        this.form.service_promise = this.form.service_promise.toString()
      }
      if (this.form.imgs.indexOf(',') != -1) {
        this.form.imgs = this.form.imgs.split(',')
      }
      console.log(this.form.service_promise)
      console.log(form)
      productApi.saveOrUpdate(form).then(res => {
        console.log(res)
        if (res.code === 'success') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push({ name: 'list' })
        } else {
          this.$message('失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  .step {
    width: 60%;
    margin: 30px auto;
  }
  .box-card {
    width: 80%;
    margin: 30px auto;
    padding: 30px;
    position: relative;
    .cover-img,
    .detail-img {
      width: 120px;
      height: 120px;
    }
    .bottom-but {
      display: flex;
      justify-content: space-evenly;
      // background-color: red;
      // margin-top: 20px;
      width: 50%;
      margin: 0 auto;
      height: 30px;
    }
  }
}
</style>
