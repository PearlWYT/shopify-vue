<template>
  <el-row :gutter="10" id="model-viewer">
    <el-col :xs="24" :sm="{ span: 5, offset: 4 }" :lg="{ span: 6, offset: 4 }">
      <div class="model">
        <model-viewer
          :src="filePath"
          autoplay
          camera-controls
          field-of-view="45deg"
          interaction-prompt="none"
          ar
          ar-modes="webxr scene-viewer quick-look"
          class="model-img"
        />
      </div>
      <p class="price">$ {{ sumPrice }}.00</p>
    </el-col>
    <el-col :xs="24" :sm="8" :class="['btns',isMobile > 768?'btns-big':'' ]">
      <el-link
        :class="['btn',isMobile > 768?'btn-big':'' ]"
        href="https://fdwig.com/collections/all"
        target="_all"
        >RETURN TO CUSTOMIZER</el-link
      >
      <el-link :class="['btn',isMobile > 768?'btn-big':'' ]" href="https://fdwig.com/cart" target="_cart"
        >RETURN TO CART</el-link
      >
      <button
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        type="button"
        :class="['btn',isMobile > 768?'btn-big':'' ]"
      >
        SHARE
      </button>
      <el-link :class="['btn',isMobile > 768?'btn-big':'' ]" :href='`https://fdwig.com/products/${shapeUrl}`'  target="_cart">
        RETURN TO PRODUCT
      </el-link>
    </el-col>
  </el-row>
</template>
<script>
// import ModelViewer from '@google/model-viewer'
export default {
  data () {
    return {
      loading: false,
      form_type: '',
      id: ''
    }
  },

  computed: {
    isMobile () {
      let width = document.body.clientWidth
      return width
    },
    message () {
      const {filePath, sumPrice, shape} = this.$route.query
      return `http://3.91.31.238/#/model?shape=${shape}&sumPrice=${sumPrice}&filePath=${filePath}`
    },
    sumPrice () {
      return this.$route.query.sumPrice
    },
    filePath () {
      return this.$route.query.filePath
    },
    shapeUrl () {
      if (this.$route.query.shape === 'st') {
        return 'straight'
      } else if (this.$route.query.shape === 'curls') {
        return 'small-curl'
      } else {
        return this.$route.query.shape
      }
    }
  },
  methods: {
    // 跳转card
    hadleAddToCard () {},
    // 返回产品列表
    handleReturnAll () {
      let routeUrl = this.$router.resolve({
        path: 'https://fdwig.com/collections/all',
        query: { id: 96 }
      })
      window.open(routeUrl.href, '_all')
    },

    onCopy (e) {
      this.$message({
        message: 'Succeed to copy url',
        type: 'success'
      })
    },
    onError (e) {
      this.$message({
        message: 'Failed to copy url',
        type: 'waring'
      })
    }
  }
}
</script>

<style lang="scss">
#model-viewer {
  margin: 10px 20px;
  .model {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    .model-img {
      width: 100%;
      height: 100%;
    }
  }
  .price {
    width: 100px;
    margin: 20px 30px;
    font-size: 20px;
    font-weight: 600;
  }
  .btns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .btn {
      margin: 20px 0 0;
      flex:0 0 48%;
      margin-right: 2%;
      height: 44px;
      color: #fff;
      background: #000;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      border: none;
    }
  }
  .btns-big{
    flex-direction: column;
    .btn-big{
      width: 200px;
    height: 44px;
    line-height: 44px;

    }
  }

}
</style>
