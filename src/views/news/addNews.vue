<template>
    <div>
      <el-card>
        <div slot="header">
          <span>{{isEdit ? '修改新闻' : '添加新闻'}}</span>
        </div>
        <el-form :model="formData" ref="formData" label-width="100px" :rules="rules" style="width: 100%;" class="mac">
          <el-form-item label="新闻标题：" prop="title">
            <el-input v-model="formData.title"/>
          </el-form-item>
          <el-form-item label="新闻头图：">
            <el-switch
              v-model="show"
              active-text="本地上传"
              inactive-text="上传链接"></el-switch>
            <uploadImg v-model="formData.header" v-show="show"></uploadImg>
            <el-input v-model="formData.header" v-show="!show"></el-input>
          </el-form-item>
          <el-form-item label="新闻内容">
            <quill-editor v-model="formData.content"
                          ref="myQuillEditor"
                          @change="handleChange($event)"
                          :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="新闻类型" prop="category">
            <el-select
              placeholder="请选择新闻类别"
              v-model="formData.category">
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.title"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-select v-model="formData.author" placeholder="请选择新闻作者">
              <el-option
                v-for="(item, index) in authorList"
                :key="index"
                :label="item.nickname"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" v-if="!isEdit">提交新闻</el-button>
            <el-button type="primary" @click="handleUpdate" v-else>修改新闻</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

import uploadImg from '@/components/uploadImg'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {
    uploadImg,
    quillEditor
  },
  data () {
    return {
      formData: {
        _id: '',
        title: '',
        content: '',
        header: '',
        contentText: '',
        category: '',
        author: ''
      },
      isEdit: false,
      token: '',
      categoryList: [],
      url: '',
      authorList: [],
      editorOption: {
        modules: {
          ImageExtend: { // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: 'file', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: 'https://upload-z1.qiniup.com', // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: (res) => {
              // console.log(res.info, res.data.url)
              return res.url
            },
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              formData.append('token', this.token)
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: { // 如果不上传图片到服务器，此处不必配置
            container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              'image': function () { // 劫持原来的图片点击按钮事件
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      show: true,
      rules: {
        title: [
          {required: true, message: '请输入新闻标题', trigger: 'blur'}
        ],
        category: [
          { required: true, message: '请选择新闻分类', trigger: 'change' }
        ],
        author: [
          { required: true, message: '请选择新闻作者', trigger: 'change' }
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
    handleChange ({html, text}) {
      this.formData.content = html
      this.formData.contentText = text
      this.formData.contentText = this.formData.contentText.substring(0, 200) + '...'
    },
    getCategory () {
      this.$axios.get('/category').then(res => {
        this.categoryList = res.data.data
      })
    },
    getAuthor () {
      this.$axios.get('/adminUser').then(res => {
        this.authorList = res.data.data
      })
    },
    handleSubmit () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          if (this.formData.header !== '' && this.formData.content !== '') {
            this.$axios.post('/news/addNews', this.formData).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  this.$router.push({name: 'newsList'})
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
            this.$axios.put('/news/editNews', this.formData).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  this.$router.push({name: 'newsList'})
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
      this.$axios.get(`/news/newsList/id=${this.formData._id}`).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data.data
        }
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
    this.getAuthor()
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
          title: '',
          content: '',
          header: '',
          contentText: '',
          category: '',
          author: ''
        }
      }
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
