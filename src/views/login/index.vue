<template>
  <div class="login-page">
    <div class="login-wrap">
      <h2>党建E家后台管理系统</h2>
      <el-form :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    // 登录方法
    handleLogin () {
      console.log(this.formData)
      this.$axios.post('/adminUser/login', this.formData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$store.commit('login', res.data.data)
          setTimeout(() => {
            this.$router.push('/layout')
          }, 500)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .login-page {
   margin: 0;
   padding: 50px 0 0 0;
   height: 100vh;
   background: #545c64;
   /*color: #e1e1e1;*/
 }
  .login-wrap{
    margin: 0 auto;
    width: 350px;
    height: 300px;
    padding: 50px;
    background: #eee;
    border-radius: 10px;

    h2{
      text-align: center;
      font-weight: 400;
    }
  }
  /deep/ .el-form-item__label{
    /*color: #fff;*/
  }
</style>
