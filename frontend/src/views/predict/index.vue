<template>
  <div class="predict-wrap">
    <el-form :model="form" ref="form" :inline="true" label-width="125px">

      <el-row>
        <el-form-item label="姓名" :rules="[ { required: true } ]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="性别" :rules="[ { required: true } ]">
          <el-radio-group v-model="form.sex" :disabled="isDisabled">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-row>  
        <el-form-item label="年龄" :rules="[ { required: true } ]">
          <el-input-number 
            v-model="form.age"
            :step="1" 
            :max="110"
            :disabled="isDisabled"
          ></el-input-number>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否填写症状描述" :prop="isDesc">
          <el-radio-group v-model="isDesc" :disabled="isDescDisable">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="症状描述" :prop="form.desc" v-show="isDescShow">
          <el-input 
            type="textarea" 
            v-model="form.desc" 
            :autosize="{ minRows: 5}" 
            placeholder="请输入症状"
            class="desc"
            :disabled="isDisabled"
          ></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="是否填写体检数据" :prop="isExam">
          <el-radio-group v-model="isExam" :disabled="isExamDisable">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item v-for="(item,i) in metrics" :label="item[0]" :prop="item[1]"  v-show="isExamShow">
          <div class="metrics"><el-input-number 
            v-model="form['exam'][item[1]]" 
            :precision="2" 
            :step="0.1" 
            :max="10"
            :disabled="isDisabled"
          ></el-input-number></div>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始判定</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
import { analysisDouble, analysisExam, analysisDesc } from '@/api/analysis'

export default {
  data() {
    return {
      isDisabled: false,
      isDesc: '是',
      isExam: '是',
      metrics: [
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
      form: {
        name: '',
        sex: '男',
        age: '',
        desc: '',
        exam: {
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
        }
      }
    }
  },

  computed: {
    isDescShow () {
      return this.isDesc == '是'
    },

    isExamShow () {
      return this.isExam == '是'
    },

    isDescDisable () {
      return this.isExam == '否'
    },

    isExamDisable () {
      return this.isDesc == '否'
    }
  },

  mounted () {
    this.$notify.info({
      title: '操作指南',
      message: '您可以同时填入症状描述和体检信息，也可以仅填入其中一项数据。点击下方的提交按钮，后台将为您完成疾病的判别。',
      duration: 8000
    });
  },

  methods: {
    onSubmit() {
      this.isDisabled = true
      let formData = {}
      for (let key in this.form) {
        formData[key] = this.form[key]
      }
      // console.log(formData);
      let _this = this
      if (this.isExam == '是' && this.isDesc == '是') {
        // analysisDouble(formData).then(res => {
        //   console.log(res.data)
        //   let msg = '该症状下患糖尿病的概率为<strong><i>' + res.data + '<i></strong>。'
        //   this.$alert(msg, '判定结果', {
        //     dangerouslyUseHTMLString: true
        //   });
        //   this.isDisabled = false
        // })
        fetch('http://127.0.0.1:3000/process/analysisDouble', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.text() }).then(res => {
          console.log(res)
          let msg = '根据体检数据和症状描述分析，患者患糖尿病的概率为<strong><i>' + res + '<i></strong>。'
          _this.$alert(msg, '判定结果', {
            dangerouslyUseHTMLString: true
          });
          _this.isDisabled = false
        })
      } else if (this.isDesc == '是') {
        fetch('http://127.0.0.1:3000/process/analysisDesc', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.text() }).then(res => {
          console.log(res)
          let msg = '根据症状描述分析，患者患糖尿病的概率为<strong><i>' + res + '<i></strong>。'
          _this.$alert(msg, '判定结果', {
            dangerouslyUseHTMLString: true
          });
          _this.isDisabled = false
        })
      } else {
        fetch('http://127.0.0.1:3000/process/analysisExam', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.text() }).then(res => {
          console.log(res)
          let msg = '根据体检数据分析，患者患糖尿病的概率为<strong><i>' + res + '<i></strong>。'
          _this.$alert(msg, '判定结果', {
            dangerouslyUseHTMLString: true
          });
          _this.isDisabled = false
        })
      }
    },

    resetForm(formName) {
      this.form.desc = ''
      this.form.age = 0
      this.form.name = ''
      this.form.sex = '男'
      this.isDesc = '是'
      this.isExam = '是'
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
  .predict-wrap {
    padding: 20px;
  }
  .desc {
    width: 515px;
  }
  .metrics {
    margin-right: 35px;
  }
</style>