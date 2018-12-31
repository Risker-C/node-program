<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>修改密码</span>
      </div>
      <el-form
        label-position="left"
        label-width="100px"
        size="medium"
        style="width:400px;margin:80px auto 0px; fontSize:36px;text-align:center"
        :rules="rules"
        ref="form"
        :model="formData">
        <el-form-item label="原密码 :" prop="oldPassword">
          <el-input v-model="formData.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="newPassword">
          <el-input v-model="formData.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="checkPassword">
          <el-input v-model="formData.checkPassword" type="password"></el-input>
        </el-form-item>
        <el-button @click="handleChange" type="primary" style="width:60%">修改</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      var password = this.$store.state.data.password
      if (value === password) {
        callback()
      } else {
        callback(new Error('密码错误'))
      }
    }
    var validateCheck = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次密码不一致，请重确认密码'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        oldPassword: 'admin',
        newPassword: 'admin',
        checkPassword: 'admin'
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 3, max: 10, message: '密码请输入3-10字符', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validateCheck, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleChange () {
      this.$axios.put('/adminUser/', {
        password: this.formData.oldPassword,
        new_password: this.formData.newPassword
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/login')
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
    }
  }
}
</script>

<style scoped>

</style>
