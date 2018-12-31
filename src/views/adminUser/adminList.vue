<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>管理员列表</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="username"
            header-align="center"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="nickname"
            header-align="center"
            align="center"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
            header-align="center"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="age"
            header-align="center"
            align="center"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            header-align="center"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            label="头像"
            header-align="center"
            align="center"
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
              <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
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
      this.$axios.get(`/adminUser/?page=${this.page}&rows=${this.rows}`).then(res => {
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
