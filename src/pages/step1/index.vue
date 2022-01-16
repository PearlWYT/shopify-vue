<template>
<div
   v-loading="loading"
    element-loading-text="Desperately Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
>
 <div class="form_popover">
    <el-popover
    placement="top-start"
    title="标题"
    width="350"
    trigger="hover"
    >
    <img alt="Empty bag" width="100%" src="static/WechatIMG68.jpeg" />
    <el-button type="text" slot="reference" icon="el-icon-warning">Wig Specs</el-button>
  </el-popover>
 </div>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <el-form-item label="Hair style" prop="shape">
          <el-select
            class="stemp-select"
            v-model="ruleForm.shape"
            placeholder="Please select Hair style"
          >
            <el-option
              v-for="item in shapes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="Hair Color" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.color"
            placeholder="Please select Hair Color"
          >
            <el-option
              v-for="item in colors"
              :key="item.color"
              :value="item.color"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="Hair Length" prop="color">
          <el-select
            class="stemp-select"
            v-model="ruleForm.length"
            placeholder="Please select Hair Length"
          >
            <el-option
              v-for="length in lengths"
              :key="length.label"
              :value="length.value"
              :label="length.label"
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
export default {
  name: 'Stemp1',
  data () {
    return {
      ruleForm: {
        shape: 'st', // 款式
        length: '16', // 长度
        color: 'black' // 颜色
      },
      visible: false,
      loading: false,
      shapes: [
        { label: 'ST', value: 'st' },
        { label: 'Body', value: 'body' },
        { label: 'Curls', value: 'curls' },
        { label: 'Yaki', value: 'yaki' },
        { label: 'Bob', value: 'bob' }
      ],
      lengths: [
        { label: '8 Inch', value: '8' },
        { label: '10 Inch', value: '10' },
        { label: '12 Inch', value: '12' },
        { label: '14 Inch', value: '14' },
        { label: '16 Inch', value: '16' },
        { label: '18 Inch ', value: '18' },
        { label: '20 Inch ', value: '20' },
        { label: '22 Inch ', value: '22' },
        { label: '24 Inch ', value: '24' },
        { label: '26 Inch', value: '26' }
      ],
      colors: [
        { color: 'black', name: 'Black' },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { color: 'winered', name: 'Wine Red' },
        { color: 'darkpurple', name: 'Dark Purple' },
        { color: 'blue', name: 'Blue' },
        { color: 'platinumblonde', name: 'Platinum Blonde' }
      ]
    }
  },
  methods: {
    // 无论那个款式，0-14 -> 10, 16-22->18, 24-26->26
    getInch (val) {
      if (['8', '10', '12', '14'].includes(val)) {
        return '10inch'
      } else if (['16', '18', '20', '22'].includes(val)) {
        return '18inch'
      } else {
        return '26inch'
      }
    },
    async submitForm (formName) {
      const info = JSON.parse(window.localStorage.getItem('info'))
      const newInch = this.getInch(this.ruleForm.length)
      const params = [this.ruleForm.shape, this.ruleForm.color, newInch]
      const newData = {
        name: info.name,
        params,
        data: info.data
      }

      this.loading = true
      // 获取远端图片
      await this.$axios({
        method: 'POST',
        // url: '/ama/profile',
        url: '/b/default/profile',
        data: JSON.stringify(newData)
      })
        .then(({ data }) => {
          this.isLoadervisible = false
          window.localStorage.setItem('filePath', data.file_path)
          window.localStorage.setItem('request_id', data.request_id)
          this.$router.push({
            path: '/step2'
          })
        })
        .catch((e) => {
          this.notificationVisible = 'Internal Server Error'
          this.isLoadervisible = false
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
