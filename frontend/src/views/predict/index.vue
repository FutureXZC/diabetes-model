<template>
  <div class="predict-wrap">
    <el-form :model="form" ref="form" :inline="true" label-width="80px">

      <el-row>
        <el-form-item label="症状描述" :prop="form.desc">
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
        <el-form-item v-for="(item,i) in metrics" :label="item[0]" :prop="item[1]">
          <el-input-number 
            v-model="form[item[1]]" 
            :precision="2" 
            :step="0.1" 
            :max="10"
            :disabled="isDisabled"
          ></el-input-number>
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
import { analysis } from '@/api/analysis'

export default {
  data() {
    return {
      isDisabled: false,
      metrics: [
        ['体检指标1', 'm1'],
        ['体检指标2', 'm2'],
        ['体检指标3', 'm3'],
        ['体检指标4', 'm4'],
        ['体检指标5', 'm5'],
        ['体检指标1', 'm1'],
        ['体检指标2', 'm2'],
        ['体检指标3', 'm3'],
        ['体检指标4', 'm4'],
        ['体检指标5', 'm5'],
        ['体检指标1', 'm1'],
        ['体检指标2', 'm2'],
        ['体检指标3', 'm3'],
        ['体检指标4', 'm4'],
        ['体检指标5', 'm5'],
        ['体检指标1', 'm1'],
        ['体检指标2', 'm2'],
        ['体检指标3', 'm3'],
        ['体检指标4', 'm4'],
        ['体检指标5', 'm5'],
        ['体检指标1', 'm1'],
        ['体检指标2', 'm2'],
        ['体检指标3', 'm3'],
        ['体检指标4', 'm4'],
      ],
      form: {
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        desc: ''
      }
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
      analysis(formData).then(res => {
        // console.log(res.data)
        let msg = '该症状下患糖尿病的概率为<strong><i>' + res.data + '<i></strong>。'
        this.$alert(msg, '判定结果', {
          dangerouslyUseHTMLString: true
        });
        this.isDisabled = false
      })
    },
    resetForm(formName) {
      this.form.desc = ''
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
    width: 500px;
  }
</style>