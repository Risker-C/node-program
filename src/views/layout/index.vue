<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside
        style="width: 200px;
         height: 100vh;
         background-color: #545c64;
         overflow: unset;">
        <Navbar/>
      </el-aside>
      <el-container>
        <el-header style="height: 50px; border-bottom: 1px solid #999">
          <Header/>
        </el-header>
        <el-main style="">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Header,
    Navbar
  }
}
</script>

<style scoped>

</style>
