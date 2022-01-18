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
        <p class="price">$ {{sumPrice}}.00</p>
    </el-col>
    <el-col :xs="24" :sm="8" class="btns">
      <el-link
        class="btn"
        href="https://fdwig.com/collections/all"
        target="_all"
        >Return to Customizer</el-link
      >
      <el-link class="btn" href="https://fdwig.com/cart" target="_cart"
        >Return to Cart</el-link
      >
      <button
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        type="button"
        class="btn"
      >
        SHARE
      </button>
    </el-col>
  </el-row>
</template>
<script>
// import ModelViewer from '@google/model-viewer'
export default {
  data () {
    return {
      loading: false
    }
  },

  computed: {
    message () {
      const path = this.$route.query.filePath
      return `https://fdwig.com/#/model?filePath=${path}`
    },
    sumPrice () {
      return this.$route.query.sumPrice
    },
    filePath () {
      return this.$route.query.filePath
    }
  },
  methods: {
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
        message: 'Processing, please try again after timeout',
        type: 'success'
      })
    },
    onError (e) {
      this.$message({
        message: 'Failed to copy texts',
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
  .price{
    width: 100px;
    margin: 20px 30px;
    font-size: 20px;
    font-weight: 600;
  }
  .btns {
    display: flex;
    flex-direction: column;
    .btn {
      margin: 20px 0 0;
      width: 150px;
      height: 42px;
      color: #fff;
      background: #000;
      cursor: pointer;
    }
  }
}
</style>
