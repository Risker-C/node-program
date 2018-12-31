<template>
    <div>
      <el-card>
        <div slot="header">
          <span>轮播图列表</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="news.title"
            header-align="center"
            align="center"
            label="新闻名">
          </el-table-column>
          <el-table-column
            prop="category.title"
            header-align="center"
            align="center"
            label="新闻分类">
          </el-table-column>
          <el-table-column
            prop="author.nickname"
            label="是否展示"
            align="center"
            header-align="center"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.type === 1 ? '展示' : '隐藏'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="index"
            header-align="center"
            align="center"
            label="优先级">
          </el-table-column>
          <el-table-column
            label="轮播图"
            align="center"
            header-align="center"
            width="200">
            <template slot-scope="scope">
              <img style="max-width: 180px; height: 80px; border-radius: 8px" :src="scope.row.header"/>
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
      this.$axios.get(`/swiper/swiperList/?page=${this.page}&rows=${this.rows}`).then(res => {
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
      this.$router.push({name: 'editSwiper', params: {id: row._id}})
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
