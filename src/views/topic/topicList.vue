<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>话题列表</span>
      </div>
      <!-- 话题列表 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="user.nickname"
          header-align="center"
          align="center"
          width="150"
          label="发帖人">
        </el-table-column>
        <el-table-column
          prop="content"
          header-align="center"
          align="center"
          label="帖子内容">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="200"
          label="详情">
          <template slot-scope="scope">
            <el-badge :value="scope.row.countNum" :max="99" class="item">
              <el-button  @click="show(scope.row)" size="small">评论数</el-button>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="操作"
          header-align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除话题</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="text-align: right;margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="page"
        :page-sizes="[5, 10, 30]"
        layout="sizes,total, prev, pager, next"
        :total="count">
      </el-pagination>
    </el-card>
    <!-- 一级弹出框:显示某一话题下的所有评论 -->
    <el-dialog title="评论详情" :visible.sync="dialogTableVisible" width="40%" center>
      <el-table :data="commentList">
        <el-table-column
          header-align="center"
          align="center"
          property="content"
          label="内容"
          width="300">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="详情">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="getComment(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="dialogTableVisible = false">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 二级弹出框:显示某一条评论的详细信息 -->
    <el-dialog width="30%" title="评论详情" :visible.sync="innerVisible" append-to-body>
      <el-card>
        <el-form ref="comment" :model="comment" label-width="80px">
          <el-form-item label="昵称">
            <el-input :value="comment.user ? comment.user.nickname : ''" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input :value="comment.user ? comment.user.username : ''" disabled></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input type="textarea" :value="comment.user ? comment.content : ''" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      rows: 10,
      page: 1,
      count: 10,
      dialogTableVisible: false, // 是否显示一级标题
      innerVisible: false, // 是否显示二级标题
      commentList: [], // 评论列表
      comment: {} // 单条评论的信息
    }
  },
  methods: {
    // 加载所有的话题
    getDate () {
      this.$axios.get(`/topic?page=${this.page}&rows=${this.rows}`).then(res => {
        this.tableData = res.data.data
        this.count = res.data.count
      })
    },
    handleSizeChange (val) {
      this.rows = val
      this.getDate()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getDate()
    },
    // 删除某一话题
    handleDelete (row) {
      this.$message.info('此功能未制作')
      console.log(row)
    },
    // 加载某条主题下的所有评论
    show (row) {
      this.dialogTableVisible = true
      this.commentList = row.comments
    },
    // 删除某一条评论
    removeComment (row) {
      this.$router.push({name: 'editNews', params: {id: row._id}})
    },
    // 查询单条评论信息
    getComment (row) {
      this.comment = {}
      this.innerVisible = true
      this.$axios.get(`/comment/id=${row._id}`).then(res => {
        this.comment = res.data.data
      })
    }
  },
  created () {
    this.getDate()
  }
}
</script>

<style scoped>
  .item {
    margin-top: 10px;
  }
</style>
