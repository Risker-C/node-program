<template>
  <div>
    <el-card>
      <div slot="header">
        <span>{{isEdit ? '修改轮播图' : '添加轮播图'}}</span>
      </div>
      <el-form :model="formData" ref="formData" label-width="100px" :rules="rules" style="width: 100%;" class="mac">
        <el-form-item label="轮播图：">
          <el-switch
            v-model="show"
            active-text="本地上传"
            inactive-text="上传链接"></el-switch>
          <uploadImg v-model="formData.header" v-show="show"></uploadImg>
          <el-input v-model="formData.header" v-show="!show"></el-input>
        </el-form-item>
        <el-form-item label="新闻类型：" prop="category">
          <el-select
            placeholder="请选择新闻类别"
            @change="change"
            v-model="formData.category">
            <el-option
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻：" prop="news">
          <el-select v-model="formData.news" placeholder="请选择新闻">
            <el-option
              v-for="(item, index) in newsList"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级：">
          <el-slider
            v-model="formData.index"
            :min="1"
            :max="998"
            show-input>
          </el-slider>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-switch
            v-model="type"
            active-text="显示"
            inactive-text="隐藏">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" v-if="!isEdit">生成轮播图</el-button>
          <el-button type="primary" @click="handleUpdate" v-else>修改轮播图</el-button>
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
        _id: '',
        news: '',
        header: '',
        category: '',
        index: 1,
        type: 1
      },
      isEdit: false,
      type: true,
      token: '',
      categoryList: [],
      isSelect: false,
      url: '',
      newsList: [],
      show: true,
      rules: {
        category: [
          { required: true, message: '请选择新闻分类', trigger: 'change' }
        ],
        news: [
          { required: true, message: '请选择新闻', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getToken () {
      this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.token = res.data.data
      })
    },
    getCategory () {
      this.$axios.get('/category').then(res => {
        this.categoryList = res.data.data
      })
    },
    change () {
      this.formData.news = ''
      this.getNews()
    },
    getNews () {
      if (this.formData.category) {
        this.$axios.get(`/category/${this.formData.category}`).then(res => {
          this.newsList = res.data.data.news
        })
      } else {
        this.hasNews = false
      }
    },
    handleSubmit () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          if (this.formData.header !== '' && this.formData.content !== '') {
            this.$axios.post('/swiper/add', this.formData).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  this.$router.push({name: 'swiperList'})
                }, 1000)
              } else {
                this.$message.warning(res.data.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          this.$message.warning('请完整新闻信息')
          return false
        }
      })
    },
    handleUpdate () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          if (this.formData.header !== '' && this.formData.content !== '') {
            this.$axios.patch('/swiper/update', this.formData).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  this.$router.push({name: 'swiperList'})
                }, 1000)
              } else {
                this.$message.warning(res.data.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          this.$message.warning('请完整新闻信息')
          return false
        }
      })
    },
    getDate () {
      this.$axios.get(`/swiper/id=${this.formData._id}`).then(res => {
        // console.log(res.data.data)
        this.formData = {
          ...this.formData,
          ...res.data.data,
          news: res.data.data.news._id,
          category: res.data.data.category._id
        }
        this.categoryList.push(res.data.data.category)
        this.newsList.push(res.data.data.news)
      })
    }
  },
  created () {
    let id = this.$route.params.id
    if (id) {
      this.formData._id = id
      this.isEdit = true
      this.getDate()
    }
    this.getToken()
    this.getCategory()
  },
  watch: {
    $route () {
      let id = this.$route.params.id
      if (id) {
        this.formData._id = id
        this.isEdit = true
      } else {
        this.isEdit = false
        this.formData = {
          _id: '',
          news: '',
          header: '',
          category: '',
          index: 1,
          type: 1
        }
        this.categoryList = []
        this.newsList = []
      }
    },
    type () {
      this.formData.type = this.type ? 1 : 0
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/
  .ql-container{
    height: 200px;

    img{
      max-width: 400px;
    }
  }
</style>
