<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border-right: 1px solid #545c64; margin-top: 50px"
      unique-opened
      router
    >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>管理员用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/layout/adminList">管理员列表</el-menu-item>
          <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>新闻管理</template>
        <el-menu-item-group>
          <el-menu-item index="/layout/newsList">新闻列表</el-menu-item>
          <el-menu-item index="/layout/addNews">添加新闻</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>分类管理</template>
        <el-menu-item-group>
          <el-menu-item index="/layout/categoryList">分类列表</el-menu-item>
          <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>轮播图管理</template>
        <el-menu-item-group>
          <el-menu-item index="/layout/swiperList">轮播图列表</el-menu-item>
          <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>评论管理</template>
        <el-menu-item-group>
          <el-menu-item index="/layout/topicList">话题列表</el-menu-item>
          <!--<el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
