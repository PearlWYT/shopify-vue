<template>
<div
 v-loading="loading"
  element-loading-text="Desperately Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
>
 <div class="form_popover">
    <el-button type="text" slot="reference" icon="el-icon-warning">Wig Specs</el-button>
 </div>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="126px"
    class="demo-ruleForm"
  >

    <el-row :gutter="20">
      <el-col :xs="22" :sm="12">
        <el-form-item label="Hair Density " prop="shape">
          <el-select
            class="stemp-select"
            v-model="ruleForm.density"
            placeholder="Please select Hair style"
          >
            <el-option
              v-for="density in densities"
          :key="density.value"
          :value="density.value"
          :label="density.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="22" :sm="12">
        <el-form-item label="Lace Material" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.laceMaterial"
            placeholder="Please select Lace Material"
          >
            <el-option
              v-for="item in laceMaterials"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="22" :sm="12">
        <el-form-item label="Cap Construction" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.cap"
            placeholder="Please select Cap Construction "
          >
            <el-option
              v-for="item in caps"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="22" :sm="12">
        <el-form-item label="Hair Line" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.hairLine"
            placeholder="Please select Hair Line "
          >
            <el-option
             v-for="(item, key) in hairLines"
          :key="key"
          :value="item.value"
          :label="item.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="22" :sm="12">
        <el-form-item label="Cap Size" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.capSize"
            placeholder="Please select Cap Size  "
          >
            <el-option
             v-for="item in capSizes"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="22" :sm="12">
        <el-form-item label="Add Elastic Bands" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.addElasticBand"
            placeholder="Please select Add Elastic Bands  "
          >
            <el-option
            v-for="(item, key) in addElasticBands"
          :key="key"
          :value="item.value"
          :label="item.label"
        >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item >
      <el-button class="btn" type="primary" @click="submitForm('ruleForm')">
        Next
        </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {sum} from 'lodash'
export default {
  name: 'Stemp2',
  data () {
    return {
      ruleForm: {
        density: '150%',
        laceMaterial: 'normal lace',
        cap: '4 parting glueless lace front crap',
        hairLine: 'natural hair line',
        capSize: 'average',
        addElasticBand: 'no'
      },
      visible: false,
      loading: false,
      densities: [
        { label: '150%', value: '150%', price: 0 },
        { label: '180%', value: '180%', price: 10 }
      ],
      laceMaterials: [
        { label: 'HD Lace', value: 'hd lace', price: 10 },
        { label: 'Normal Lace', value: 'normal lace', price: 0 }
      ],
      caps: [
        {
          label: '4 Parting Glueless Lace Front Crap',
          value: '4 parting glueless lace front crap',
          price: 0
        },
        {
          label: '6 Deep Parting Glueless Lace Front Crap',
          value: '6 deep parting glueless lace front crap',
          price: 20
        },
        {
          label: 'Glueless 5*5 Closure Lace Cap',
          value: 'glueless 5*5 closure lace cap',
          price: 20
        },
        { label: '13*4 Lace Cap', value: '13*4 lace cap', price: 20 },
        { label: '13*4*1 Lace Cap', value: '13*4*1 lace cap', price: 20 },
        { label: '13*6 Lace Cap', value: '13*6 lace cap', price: 20 }
      ],
      hairLines: [
        { label: 'Natural Hair Line', value: 'natural hair line', price: 0 },
        { label: 'Pre-plucked HairLine', value: 'pre-plucked hair line', price: 0 }
      ],
      capSizes: [
        { label: 'Average', value: 'average', price: 0 },
        { label: 'Petite', value: 'petite', price: 0 },
        { label: 'Large', value: 'large', price: 0 },
        { label: 'Custom ', value: 'custom', price: 10 }
      ],
      addElasticBands: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],
      // 轮询时间
      timer: null,
      // 是否执行轮训

      filePath: '',
      // 请求模型id
      requestId: ''
    }
  },
  computed: {
    // 获取总价格
    sumPrice2 () {
      const densityPrice = this.densities.find(i => i.value === this.ruleForm.density).price
      const laceMaterialPrice = this.laceMaterials.find(i => i.value === this.ruleForm.laceMaterial).price
      const capPrice = this.caps.find(i => i.value === this.ruleForm.cap).price
      const hairLinePrice = this.hairLines.find(i => i.value === this.ruleForm.hairLine).price
      const capSizePrice = this.capSizes.find(i => i.value === this.ruleForm.capSize).price
      const sumPrice = this.$route.query.sumPrice
      return sum([densityPrice, laceMaterialPrice, capPrice, hairLinePrice, capSizePrice, Number(sumPrice)])
    }
  },
  mounted () {
    this.stopSetInterval()
    this.filePath = window.localStorage.getItem('filePath')
    this.requestId = window.localStorage.getItem('request_id')
  },
  methods: {
    // 开启轮询  如果存在则先销毁定时器后重新开启
    submitForm () {
      this.createSetInterval()
    },
    createSetInterval () {
      this.loading = true
      this.stopSetInterval()
      this.timer = setInterval(() => {
        this.getNewMessage()
      }, 5000)
    },
    // 关闭轮询
    stopSetInterval () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // 请求是否有新消息
    async getNewMessage () {
      await this.$axios({
        method: 'GET',
        // url: '/ama/status',
        url: '/b/default/status',
        headers: {
          'x-jizhan-request-id': this.requestId
        }
      })
        .then(({ data }) => {
          if (data.status === 'done') {
            this.loading = false
            this.stopSetInterval()
            this.$message({
              message: 'Success',
              type: 'success'
            })

            this.$router.push({
              path: '/model',
              query: {
                shape: this.$route.query.shape,
                sumPrice: this.sumPrice2,
                filePath: this.filePath
              }
            })
          } else if (data.status === 'timeout') {
            this.$message({
              message: 'Processing, please try again after timeout',
              type: 'warning'
            })
            this.loading = false // 选择配置的暂时不支持，请重新配置
            this.stopSetInterval()
          } else if (data.status === 'bad') {
            this.$message({
              message: 'The selected configuration is temporarily not supported, please reconfigure',
              type: 'warning'
            })
            this.loading = false
            this.stopSetInterval()
            setTimeout(() => {
              this.$router.push({
                path: '/step1'
              })
            }, 800)
          }
          this.is2D = data.status
        })
        .catch((e) => {
          this.stopSetInterval()
          this.$message({
            message: 'Internal Server Error',
            type: 'warning'
          })
          this.loading = false
          this.$router.push({
            path: '/step1'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.form_popover{
  margin: 20px;
  display: flex;
}
.stemp-select {
  width: 80%;
}
.btn{
  float: right;
  margin-right: 10%;
  margin-top: 10%;
}
.el-loading-mask{
  height: 100vh;
}
</style>
