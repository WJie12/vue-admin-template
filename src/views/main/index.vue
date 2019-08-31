<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="SearchBy" class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarSearchBy" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-input v-model="listQuery.value" placeholder="Param" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.species" class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarSpecies" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list.slice((pageNo-1)*pageSize,pageNo*pageSize)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column sortable="true" label="ID" type="index" align="center" width="60" />
      <el-table-column sortable="true" label="GeneAID" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id.gene_a_id }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="GeneASymbol" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.geneASymbol }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="GeneBID" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id.gene_b_id }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="GeneBSymbol" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.geneBSymbol }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="PubmedID" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pubmedId }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="Evidence" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.evidence }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="Type" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="Score" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="true" label="CellLine/Disease" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.cell_line">{{ scope.row.cell_line }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNo"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<template>
  <div class="chart-container">
    <chart v-bind:json="list" height="100%" width="100%" />
  </div>
</template>

<script>
import { human, humanBySymbol, humanById,
  worm, wormBySymbol, wormById
  , yeast, yeastBySymbol, yeastById,
  fly, flyBySymbol, flyById,
  mouse, mouseBySymbol, mouseById
} from '@/api/main'
// import waves from '@/directive/waves' // waves directive
import Chart from '@/components/Charts/Graph'

const calendarSpecies = [
  { key: 'human', display_name: 'human' },
  { key: 'fly', display_name: 'fly' },
  { key: 'worm', display_name: 'worm' },
  { key: 'yeast', display_name: 'yeast' },
  { key: 'mouse', display_name: 'mouse' }
]
const calendarSearchBy = [
  { key: 'id', display_name: 'Gene ID' },
  { key: 'name', display_name: 'Gene Name' }
]

export default {
  name: 'ComplexTable',
  // directives: { waves },
  components: { Chart },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      length: 0,
      pageNo: 1, // 当前页
      pageSize: 10, // 每页显示条目数
      tableKey: 0,
      list: [{ id: { gene_a_id: 172636, gene_b_id: 173788 }, geneASymbol: 'CELE_D1081.2', geneBSymbol: 'CELE_B0304.1' }],
      total: 0,
      listLoading: true,
      listQuery: {
        // page: 1,
        // limit: 20,
        type: 'id',
        value: undefined,
        species: 'human'
        // sort: '+id'
      },
      calendarSpecies,
      calendarSearchBy,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let param
      if (this.listQuery.value) {
        param = encodeURIComponent(this.listQuery.value)
      }
      if (this.listQuery.species === 'mouse') {
        if (this.listQuery.type === 'id' && this.listQuery.value) {
          mouseById(param).then(response => {
            this.list = response
          })
        } else if (this.listQuery.type === 'name' && this.listQuery.value) {
          mouseBySymbol(param).then(response => {
            this.list = response
          })
        } else {
          mouse().then(response => {
            this.list = response
          })
        }
      } else if (this.listQuery.species === 'worm') {
        if (this.listQuery.type === 'id' && this.listQuery.value) {
          wormById(param).then(response => {
            this.list = response
          })
        } else if (this.listQuery.type === 'name' && this.listQuery.value) {
          wormBySymbol(param).then(response => {
            this.list = response
          })
        } else {
          worm().then(response => {
            this.list = response
          })
        }
      } else if (this.listQuery.species === 'fly') {
        if (this.listQuery.type === 'id' && this.listQuery.value) {
          flyById(param).then(response => {
            this.list = response
          })
        } else if (this.listQuery.type === 'name' && this.listQuery.value) {
          flyBySymbol(param).then(response => {
            this.list = response
          })
        } else {
          fly().then(response => {
            this.list = response
          })
        }
      } else if (this.listQuery.species === 'yeast') {
        if (this.listQuery.type === 'id' && this.listQuery.value) {
          yeastById(param).then(response => {
            this.list = response
          })
        } else if (this.listQuery.type === 'name' && this.listQuery.value) {
          yeastBySymbol(param).then(response => {
            this.list = response
          })
        } else {
          yeast().then(response => {
            this.list = response
          })
        }
      } else {
        if (this.listQuery.type === 'id' && this.listQuery.value) {
          humanById(param).then(response => {
            this.list = response
          })
        } else if (this.listQuery.type === 'name' && this.listQuery.value) {
          humanBySymbol(param).then(response => {
            this.list = response
          })
        } else {
          human().then(response => {
            this.list = response
          })
        }
      }
      this.listLoading = false
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.pageNo = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
<!--<style scoped>-->
<!--  .chart-container{-->
<!--    position: relative;-->
<!--    width: 100%;-->
<!--    height: calc(100vh - 84px);-->
<!--  }-->
<!--</style>-->
