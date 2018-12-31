<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :data="uploadData"
      action="https://upload-z1.qiniup.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      imageUrl: this.value,
      uploadData: {
        token: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.url
      this.$emit('input', res.url)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getToken () {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.uploadData.token = res.data.data
      })
    }
  },
  watch: {
    value (val) {
      this.imageUrl = val
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    display: block;
  }
</style>
