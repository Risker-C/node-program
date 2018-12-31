<template>
    <div>
      <el-card>
        <div slot="header">
          <span>分类列表</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 800px"
          class="mac"
          border>
          <el-table-column
            prop="title"
            align="center"
            style="text-align: center;"
            header-align="center"
            label="分类名"
            width="150">
          </el-table-column>
          <el-table-column
            label="分类图标"
            align="center"
            header-align="center">
            <template slot-scope="scope">
              <img style="width: 80px; height: 80px; border-radius: 8px" :src="scope.row.icon"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="countNum"
            align="center"
            style="text-align: center;"
            header-align="center"
            label="新闻数量"
            width="150">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="250"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">详情</el-button>
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
      count: 10,
      rows: 10,
      page: 1
    }
  },
  methods: {
    getDate () {
      this.$axios.get(`/category/?page=${this.page}&rows=${this.rows}`).then(res => {
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
      this.$router.push({name: 'updateCategory', params: {id: row._id}})
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
