<template>
  <div class="header clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="fll" style="line-height: 50px">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    党建e家后台管理
    <el-dropdown @command="handleCommand" class="flr" style="line-height: 50px; margin-top: 5px">
      <span class="el-dropdown-link">
    <img class="el-dropdown-link userImg" :src="this.$store.state.userInfo.header"/>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editAdmin">修改个人信息</el-dropdown-item>
          <el-dropdown-item command="editPass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'editAdmin':
          this.$router.push('/layout/editAdmin')
          break
        case 'editPass':
          this.$router.push('/layout/editPass')
          break
        default:
          break
      }
    },
    logout () {
      this.$axios.get('/adminUser/logout').then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$store.commit('logout')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$message.warning(res.data.msg)
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .header{
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-weight: 600;
  }
  .userImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

</style>
