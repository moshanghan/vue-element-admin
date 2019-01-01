<!---->
<template>
  <div class="app-container user-container">

    <div class="filter-container">
      <el-input v-model="oSearch.name" placeholder="请输入昵称进行查找" type="text" style="width: 200px;" class="search-item" />
      <el-input v-model="oSearch.email" placeholder="请输入邮箱进行查找" type="email" style="width: 200px;" class="search-item" />
      <el-date-picker v-model="timeRange" class="search-item" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-button class="search-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="search-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleClear">清空</el-button>
    </div>

    <el-table :data="aTableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="昵称" width="180" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column label="用户头像" width="100">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" :src="scope.row.avatar" alt="" class="user-avatar">
          <span v-else>暂无头像</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.date|normalTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="oSearch.pageIndex" :limit.sync="oSearch.pageSize" @pagination="handleFilter" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { validateEmail } from '@/utils/validate'
import getData from '@/utils/fetch'
import { Message } from 'element-ui'
export default {
  components: { Pagination },
  data() {
    return {
      timeRange: [],
      oSearch: {
        name: '',
        email: null,
        pageSize: 20,
        pageIndex: 1,
        startTime: null,
        endTime: null
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      aTableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 查找
    handleFilter() {
      console.log(this.timeRange)
      if (this.timeRange && this.timeRange.length) {
        this.oSearch.startTime = this.timeRange[0]
        this.oSearch.endTime = this.timeRange[1]
      }
      if (this.oSearch.email) {
        if (!validateEmail(this.oSearch.email)) {
          Message({
            message: '邮箱格式错误',
            type: 'warning',
            duration: 2 * 1000
          })
        } else {
          this.oSearch.pageSize = 20
          this.oSearch.pageIndex = 1
        }
      } else {
        this.getData()
      }
    },
    // 清空
    handleClear() {
      this.oSearch.name = ''
      this.oSearch.email = ''
      this.oSearch.pageSize = 20
      this.oSearch.pageIndex = 1
      this.timeRange = []
      this.oSearch.startTime = null
      this.oSearch.endTime = null

      this.getData()
    },

    // 获取用户列表数据
    getData() {
      getData.postData('/users/userList', this.oSearch).then(res => {
        console.log(res && res.data)
        if (res && res.data && res.data.success) {
          this.aTableData = res.data.list
          this.total = res.data.total || 0
        } else {
          Message({
            message: '失败啦',
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .search-item {
    margin-bottom: 10px;
  }
  .user-avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
