<template>
    <div>
      <el-card>
        <div slot="header">
          <span>{{isEdit ? '修改分类' : '添加分类'}}</span>
        </div>
        <el-form ref="form" :rules="rules" :model="formData" label-width="100px" style="width: 500px;" class="mac">
          <el-form-item label="分类名称：" prop="title">
            <el-input v-model="formData.title"/>
          </el-form-item>
          <el-form-item label="分类图标：">
            <el-switch
              v-model="show"
              active-text="本地上传"
              inactive-text="上传链接"></el-switch>
            <uploadImg v-model="formData.icon" v-show="show"></uploadImg>
            <el-input v-model="formData.icon" v-show="!show"></el-input>
          </el-form-item>
          <el-form-item v-if="!isEdit">
            <el-button
              style="width: 300px"
              type="primary"
              @click="handleUpload">
              提交
            </el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button
              style="width: 300px"
              type="primary"
              @click="handleSubmit">
              保存修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import uploadImg from '@/components/uploadImg'
export default {
  components: {
    uploadImg
  },
  data () {
    return {
      formData: {
        title: '',
        icon: '',
        _id: ''
      },
      isEdit: false,
      show: true,
      rules: {
        title: [
          { required: true, message: '请输入分类名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUpload () {
      console.log(this.formData)
      if (this.formData.icon) {
        this.$axios.post('/category/add', this.formData).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            setTimeout(() => {
              this.$router.push('/layout/categoryList')
            }, 1000)
          } else {
            this.$message.warning(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.warning('请上传分类头图')
      }
    },
    handleSubmit () {
      console.log(this.formData)
      if (this.formData.icon) {
        this.$axios.put('/category/update', this.formData).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            setTimeout(() => {
              this.$router.push('/layout/categoryList')
            }, 1000)
          } else {
            this.$message.warning(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.warning('请上传分类头图')
      }
    },
    getData () {
      this.$axios.get(`/category/${this.formData._id}`).then(res => {
        this.formData = res.data.data
      })
    }
  },
  created () {
    const id = this.$route.params.id
    if (id) {
      this.formData._id = id
      this.isEdit = true
      this.getData()
    }
  },
  watch: {
    $route () {
      const id = this.$route.params.id
      if (id) {
        this.formData._id = id
        this.isEdit = true
      } else {
        this.isEdit = false
        this.formData = {
          title: '',
          icon: '',
          _id: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
