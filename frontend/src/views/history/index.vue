<template>
  <div class="history-wrap">
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        prop="time"
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
            @click="handleDetail(scope.$index, scope.row)">体检数据</el-button>
          <el-dialog title="体检数据" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column 
                v-for="(item,i) in metrics" 
                :property="item[1]" 
                :label="item[0]" 
                width="150"
              ></el-table-column>
              <!-- <el-table-column property="time" label="体检指标2" width="150"></el-table-column> -->
            </el-table>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除记录</el-button>
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
          time: '2016-05-02 22:46:10',
          isDesc: '是',
          desc: '头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛头痛脚痛全身痛',
          isExam: '否',
          prob: '20%',
          level: '低'
        }],
        dialogTableVisible: false,
        gridData: [{
          name: '',
          time: '',
          age: '',
          sex: '',
          thxhdb: '',
          gaxztm: '',
          rstqm: '',
          dmdzdb: '',
          qbdb: '',
          ns1: '',
          ns2: '',
          zdgc: '',
          zdzs: '',
          zdhs: '',
          zdb: '',
          qdb: '',
          gysz: '',
          bqb: '',
          bdb: '',
          zjdhs: '',
          jxlsm: '',
          jg: '',
          jsjm: '',
          djzm: '',
          zdba: '',
          ptt: '',
          zzdba1: '',
          zzdbb: '',
          jjdhs: '',
          gmdzdb: ''
        }],
        metrics: [
          ['姓名', 'name'],
          ['日期', 'time'],
          ['年龄', 'age'],
          ['性别', 'sex'],
          ['糖化血红蛋白', 'thxhdb'],
          ['γ-谷氨酰转肽酶', 'gaxztm'],
          ['乳酸脱氢酶', 'rstqm'],
          ['低密度脂蛋白', 'dmdzdb'],
          ['前白蛋白', 'qbdb'],
          ['尿素', 'ns1'],
          ['尿酸', 'ns2'],
          ['总胆固醇', 'zdgc'],
          ['总胆汁酸', 'zdzs'],
          ['总胆红素', 'zdhs'],
          ['总蛋白', 'zdb'],
          ['球蛋白', 'qdb'],
          ['甘油三脂', 'gysz'],
          ['白球比', 'bqb'],
          ['白蛋白', 'bdb'],
          ['直接胆红素', 'zjdhs'],
          ['碱性磷酸酶', 'jxlsm'],
          ['肌酐', 'jg'],
          ['肌酸激酶', 'jsjm'],
          ['胆碱脂酶', 'djzm'],
          ['脂蛋白(a)', 'zdba'],
          ['葡萄糖', 'ptt'],
          ['载脂蛋白A1', 'zzdba1'],
          ['载脂蛋白B', 'zzdbb'],
          ['间接胆红素', 'jjdhs'],
          ['高密度脂蛋白', 'gmdzdb']
        ],
      }
    },

    created () {
      fetch('http://127.0.0.1:3000/sql/getList', {
        method: 'post',
      }).then(res => { return res.json() }).then(res => {
        let tmp = {}
        for (let i = 0; i < 15; i++) {
          console.log(res[i])
          tmp['time'] = res[i]['time']
          tmp['isDesc'] = res[i]['isDesc'] == 1 ? '是' : '否'
          tmp['desc'] = res[i]['desc']
          tmp['isExam'] = res[i]['isExam'] == 1 ? '是' : '否'
          tmp['prob'] = res[i]['prob']
          tmp['level'] = tmp['prob'] > 0.3 ? (tmp['prob'] > 0.6 ? '高' : '中') : '低'
          this.tableData.push(tmp)
          tmp = {}
        }
        console.log(this.tableData)
      })
    },
    
    methods: {
      handleDetail(index, row) {
        if (row['isExam'] == '否') {
          this.$alert('该患者没有输入体检数据。', '体检数据', {});
          return
        }
        let _this = this
        fetch('http://127.0.0.1:3000/sql/getExam', {
          method: 'post',
          body: JSON.stringify({'time': row['time']}),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.json() }).then(res => {
          console.log(res)
          for (let key in res[0]) {
            _this.gridData[0][key] = res[0][key]
          }
          this.dialogTableVisible = true
        })
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