<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input placeholder="请输入" v-model="queryParam.name" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="1" v-model="queryParam.status" allowClear>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetClick">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.addOrEdit.add()">新增</a-button>
      <a-button class="interval" v-if="ids.length > 0" type="danger" @click="del(undefined)">
        <a-icon type="delete"/>
        删除
      </a-button>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>
      <span slot="type" slot-scope="text">
        {{ text | typeFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="$refs.addOrEdit.add(record.id,record.level)">新增</a>
        <a-divider type="vertical"/>
        <a @click="$refs.addOrEdit.edit(record.id)">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确认删除？" cancelText="取消" okText="确认" @confirm="del(record.id)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a>删除</a>
        </a-popconfirm>
      </span>
    </s-table>
    <add-or-edit ref="addOrEdit" @flushTable="flushTable"></add-or-edit>
  </a-card>
</template>

<script>
  import { STable } from '@/components'
  import addOrEdit from './AddOrEdit'
  import { userList, deleteByIds, updateUserStatus } from '@/api/system/user'

  export default {
    components: { STable, addOrEdit },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    name: 'PermissionList',
    data() {
      return {
        form: {},
        // 用户状态
        userStatus: {},
        // 多选
        selectedRowKeys: [],
        ids: [],
        // 表头
        columns: [
          {
            title: '用户名',
            dataIndex: 'username'
          },
          {
            title: '手机号',
            dataIndex: 'phoneNumber'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            width: '260px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        queryParam: {},
        loadData: parameter => {
          const params = Object.assign(parameter, this.queryParam)
          return userList(params).then(res => {
            return res.data
          })
        },
      }
    },
    methods: {
      // 刷新表单
      flushTable() {
        this.$refs.table.refresh(true)
      },
      // 重置
      resetClick() {
        this.queryParam = {}
        this.flushTable()
      },
      // 多选改变
      onSelectChange (selectedRowKeys, selectedRows) {
        this.ids = selectedRows.map(d => d.id)
        console.log(this.ids)
      },
      // 批量删除
      del(id) {
        deleteByIds(id).then(res => {
          if (res.code === 0) {
            this.$message.success('操作成功')
            this.flushTable()
          } else {
            this.$message.success('操作失败')
          }
        })
      },
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '可用',
          2: '禁用'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        const typesMap = {
          1: '菜单',
          2: '按钮'
        }
        return typesMap[type]
      },
      cancelData() {
        this.visible = false
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>

<style scoped>
  .interval{
    margin-left: 8px
  }
</style>