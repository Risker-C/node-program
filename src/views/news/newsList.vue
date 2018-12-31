<template>
    <div>
      <el-card class="box-card">
        <div slot="header">
          <span>新闻列表</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            header-align="center"
            align="center"
            label="新闻名">
          </el-table-column>
          <el-table-column
            prop="contentText"
            header-align="center"
            align="center"
            label="新闻简介">
          </el-table-column>
          <el-table-column
            prop="author.nickname"
            label="作者"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="category.title"
            header-align="center"
            align="center"
            label="分类">
          </el-table-column>
          <el-table-column
            label="新闻头图"
            align="center"
            header-align="center"
            width="100">
            <template slot-scope="scope">
              <img style="width: 80px; height: 80px; border-radius: 8px" :src="scope.row.header"/>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      rows: 10,
      page: 1,
      count: 10
    }
  },
  methods: {
    getDate () {
      this.$axios.get(`/news/newsList/?page=${this.page}&rows=${this.rows}`).then(res => {
        // console.log(res)
        this.tableData = res.data.data
        this.count = res.data.count
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.rows = val
      this.getDate()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getDate()
    },
    handleEdit (row) {
      this.$router.push({name: 'editNews', params: {id: row._id}})
    },
    handleDelete (row) {
      this.$message.info('此功能未制作')
      console.log(row)
    }
  },
  created () {
    this.getDate()
  }
}
</script>

<style scoped>

</style>
