<template>
  <div class="history-wrap">
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="记录时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isDesc"
        label="是否输入症状描述"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.isDesc === '是' ? 'primary' : 'danger'"
                disable-transitions>{{scope.row.isDesc}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="isExam"
        label="是否输入体检数据"
        width="180">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isExam === '是' ? 'primary' : 'danger'"
            disable-transitions>{{scope.row.isExam}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="患糖尿病概率"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.prob }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.level === '高' ? 'danger' : scope.row.level === '中'
                ? 'primary' : 'success'" disable-transitions>{{scope.row.level}}</el-tag>
            </div>
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column 
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-dialog title="体检数据" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="m1" label="体检指标1" width="150"></el-table-column>
              <el-table-column property="m2" label="体检指标2" width="150"></el-table-column>
              <el-table-column property="m3" label="体检指标3" width="150"></el-table-column>
              <el-table-column property="m1" label="体检指标1" width="150"></el-table-column>
              <el-table-column property="m2" label="体检指标2" width="150"></el-table-column>
              <el-table-column property="m3" label="体检指标3" width="150"></el-table-column>
              <el-table-column property="m1" label="体检指标1" width="150"></el-table-column>
              <el-table-column property="m2" label="体检指标2" width="150"></el-table-column>
              <el-table-column property="m3" label="体检指标3" width="150"></el-table-column>
              <el-table-column property="m1" label="体检指标1" width="150"></el-table-column>
              <el-table-column property="m2" label="体检指标2" width="150"></el-table-column>
              <el-table-column property="m3" label="体检指标3" width="150"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '否',
          prob: '20%',
          level: '低'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '是',
          prob: '20%',
          level: '高'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '否',
          desc: '',
          isExam: '是',
          prob: '20%',
          level: '中'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '是',
          prob: '20%',
          level: '高'
        },{
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '否',
          prob: '20%',
          level: '低'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '是',
          prob: '20%',
          level: '高'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '否',
          desc: '',
          isExam: '是',
          prob: '20%',
          level: '中'
        }, {
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '是',
          prob: '20%',
          level: '高'
        },{
          date: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '否',
          prob: '20%',
          level: '低'
        }],
        dialogTableVisible: false,
        gridData: [{
          'm1': 1.0,
          'm2': 2.0,
          'm3': 1.5
        }]
      }
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.dialogTableVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row)
      }
    }
}
</script>

<style>
  .history-wrap{
    padding: 20px;
  }
</style>