<template name="Cropper">
  <div id="cropper">
    <div class="cropper-desc">
      Please upload a frontal face photo that matches the contour of the
      reference image we provide
    </div>
    <div class="cropper-desc" style="color: #000">
      Our Virtual Try On Feature is still under testing. The refinement of 3D
      images, the matching between avatars and wigs, and the transmission speed
      are all being optimized. We apologize for any inconvenience this might
      cause. Please come back for better experience.
    </div>
    <el-row class="cropper-row">
      <el-col :xs="24" :sm="{ span: 8, offset: 8 }">
        <div class="cut">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :fixed="fixed"
            :fixed-number="fixedNumber"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            mode="cover"
            :max-img-size="option.max"
            @real-time="realTime"
            @img-load="imgLoad"
            @crop-moving="cropMoving"
          ></vue-cropper>

          <div
          :style="{
              width: previews.w + 'px',
              height: previews.h + 'px',
              overflow: 'hidden',
            }"
           class="cropper-show">
            <div :style="previews.div">
              <img
                :style="previews.img"
                src="static/face.png"
                alt=""
                class="previewImg"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="test-button">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6">
          <label class="upload btn" for="uploads">UPLOAD</label>
          <input
            id="uploads"
            type="file"
            style="position: absolute; clip: rect(0 0 0 0)"
            accept="image/*"
            mutiple="mutiple"
            @change="uploadImg($event, 1)"
          />
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-button type="primary" class="btn" plain @click="clearCrop"
            >CLEAR
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-button type="primary" class="btn" plain @click="refreshCrop">
            REFRESH
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-button type="primary" class="btn" plain @click="down('blob')">
            NEXT
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { compressAccurately } from 'image-conversion'
export default {
  name: 'Cropper',
  // setup (props, { root }) {
  //   const handleNextClick = () => {
  //     return root.$router.push('/step1')
  //   }
  //   return {
  //     handleNextClick
  //   }
  // },
  components: { VueCropper },
  data () {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      imgDeafult: 'static/mark.jpeg',

      option: {
        img: 'static/mark.jpeg',
        size: 1,
        full: false,
        outputType: 'png',
        name: 'demo.png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        // autoCropWidth: 240,
        // autoCropHeight: 320,
        centerBox: false,
        high: true,
        max: 99999
      },
      show: true,
      fixed: true,
      fixedNumber: [3, 4]
    }
  },
  mounted () {},

  methods: {
    handleNextClick () {
      return this.$router.push('/step1')
    },
    clearCrop () {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop () {
      // clear
      this.$refs.cropper.refresh()
    },
    // 实时预览函数
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    realTime (data) {
      this.previews = data
    },

    down (type) {
      event.preventDefault()
      // 输出;
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          const isJpgOrPng =
            data.type === 'image/jpeg' || data.type === 'image/png'
          // const isLt2M = data.size / 1024 / 1024 < 2;
          if (!isJpgOrPng) {
            // this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            return false
          }
          // if (!isLt2M) {
          //   // this.$message.error('上传头像图片大小不能超过 2MB!');
          //   return false;
          // }
          return new Promise((resolve) => {
            compressAccurately(data, {
              with: 480,
              height: 640
            }).then((res) => {
              this.$refs.cropper.getCropData((res) => {
                this.downImg = res
                const newData = res.split('base64,')[1]
                const info = {
                  name: this.option.name,
                  data: newData
                }
                window.localStorage.setItem('info', JSON.stringify(info))
                this.handleNextClick()
              })
              resolve(res)
            })
          })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          this.handleNextClick()
        })
      }
    },

    uploadImg (e, num) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          const blob = new Blob([e.target.result])
          data = window.URL.createObjectURL(blob)
          // const file = new File([blob], '');
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
          this.option.name = file.name
          this.option.outputType = file.name.split('/')[1]
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad (msg) {
      // console.log(msg);
    },
    cropMoving (data) {
      // console.log(data, "截图框当前坐标");
    },
    handleShow (e) {
      e.stoppropagation()
    }
  }
}
</script>
<style lang="scss">
#cropper {
  max-width: 1272px;
  padding: 0 16px;
  margin: 0 auto;
  .cropper-row {
    margin: 30px 0;
  }
  .cut {
    position: sticky;
    width: auto;
    height: 57vh;
    background: #c2e7b0;
  }
  .cropper-show {
    position: absolute;
    opacity: 0.2;
    border: 3px dashed red;
    pointer-events: none;
    top: 0;
    left: 11%;
    .previewImg {
      margin-left: -40%;
    }
  }
}
.test-button {
  display: flex;
  justify-content: center;
  .btn {
    width: 120px;
    margin-top: 16px;
  }
}
.img-mark {
  width: 100%;
  height: 100%;
}
.upload {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:active {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
    outline: 0;
  }
  &:hover {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
.cropper-desc {
  margin: 16px 5%;
  color: red;
}
</style>
