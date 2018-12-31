<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="tac">添加管理员用户</div>
      </div>
      <el-form
        ref="form"
        :model="formData"
        label-width="100px"
        label-position="right"
        status-icon
        :rules="rules"
        style="width:500px;margin:50px auto 0">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="formData.username"  disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input v-model="formData.nickname" ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-switch
            v-model="formData.sex"
            active-text="女"
            inactive-text="男"></el-switch>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number :min="10" :max="60"  v-model.number="formData.age"/>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formData.idCard"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="个性签名：" prop="desc">
          <el-input v-model="formData.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item
          label="头像：">
          <el-switch
            v-model="show"
            active-text="本地上传"
            inactive-text="上传链接"></el-switch>
          <uploadImg v-model="formData.header" v-show="show"></uploadImg>
          <el-input v-model="formData.header" v-show="!show"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="submitForm()" style="width: 300px">保存修改</el-button>
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
    var validatePassword = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        // username: 'admin2',
        // nickname: 'admin2',
        // password: 'admin',
        // checkPassword: 'admin',
        // desc: 'admin',
        // email: '123@123.com',
        // phone: '1231231231',
        // idCard: 'admin2',
        // avatar: '',
        // sex: 1,
        // age: 10
      },
      show: true,
      rules: {
        username: [
          {required: true, message: '请输入用户名', targger: 'blur'},
          {min: 3, max: 10, message: '用户名长度在3-5个字符', targger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', targger: 'blur'},
          {min: 3, max: 10, message: '密码长度在5-10个字符', targger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请确认密码', targger: 'blur'},
          {validator: validatePassword}
        ],
        nickname: [
          {required: true, message: '请输入昵称', targger: 'blur'},
          {min: 3, max: 10, message: '昵称长度在3-8个字符', targger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入签名', targger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', targger: 'blur'},
          {type: 'email', message: '请输入正确邮箱', targger: 'blur'}
        ],
        idCard: [
          {required: true, message: '请输入身份证号', targger: 'blur'},
          {type: 'idCard', message: '请输入身份证号', targger: 'blur'}
        ]
        // age: [
        //   { required: true, message: '年龄不能为空' },
        //   { type: 'number', message: '年龄必须为数字值' },
        //   { min: 10, max: 60, message: '年龄必须在10到60之间' }
        // ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios.patch('/adminUser/editAdmin', this.formData).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.$store.commit('login', res.data.data)
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({name: 'adminList'})
              }, 1000)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        } else {
          return false
        }
      })
    },
    // 获取个人信息
    handleLogin () {
      this.$axios.get(`/adminUser/id=${this.$store.state.userInfo._id}`).then(res => {
        if (res.data.code === 200) {
          // this.$store.commit('login', res.data.data)
          this.formData = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created () {
    this.handleLogin()
  }
}
</script>

<style scoped>

</style>
