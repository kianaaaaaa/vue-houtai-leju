<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card body-style="padding:0;">
          <div class="dashboard-box">
            <ul>
              <li style="border-bottom:1px solid #ebeef5;">用户数量: <span>{{ list.userCount }} </span>个</li>
              <li>今日新增:<span>{{ list.userToday }} </span></li>
            </ul>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card body-style="padding:0;">
          <div class="dashboard-box">
            <ul>
              <li style="border-bottom:1px solid #ebeef5;">产品数量: <span>{{ list.productCount }} </span>个</li>
              <li>今日新增:<span>{{ list.productToday }} </span></li>
            </ul>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card body-style="padding:0;">
          <div class="dashboard-box">
            <ul>
              <li style="border-bottom:1px solid #ebeef5;">订单数量: <span>{{ list.orderCount }} </span>个</li>
              <li>今日新增:<span>{{ list.orderToday }} </span></li>
            </ul>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card body-style="padding:0;">
          <div class="dashboard-box">
            <ul>
              <li style="border-bottom:1px solid #ebeef5;">退单数量: <span>{{ list.backCount }} </span>个</li>
              <li>今日新增:<span>{{ list.backToday }} </span></li>
            </ul>
          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-card style="margin-top:30px;">
      <div id="main" style="width: 80%;height:400px;margin:30px auto;" />
    </el-card>
    <el-card style="margin-top:30px;">
      <el-calendar v-model="list.value" />
    </el-card>
  </div>
</template>

<script>
var echarts = require('echarts')

import api from '@/api/dashboard'

export default {
  data() {
    return {
      list: {
        orderByDay: [],
        value: new Date()
      }

    }
  },

  created() {
    this.getlist()
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'))
  },
  methods: {
    getlist() {
      api.baseInfo().then(res => {
        this.list = res
        console.log(this.list)
        this.drawLine()
      })
    },
    drawLine() {
      var xData = []
      var yData = []
      var orderByDay = this.list.orderByDay

      for (let i = 0; i < orderByDay.length; i++) {
        xData.push(orderByDay[i].date)
        yData.push(orderByDay[i].count)
      }

      this.myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '订单数量/日期'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: xData
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: yData
          }
        ]
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
        min-height: calc(100vh - 50px);
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-box{
    ul{
      padding-inline-start: 0px;
    }
    li{
      list-style: none;
      height: 35px;
      text-align: center;
      line-height: 35px;
    color: rgb(64, 158, 255);
    span{
      color: black;
    }
    }

  }
}
</style>
