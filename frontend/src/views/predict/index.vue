<template>
  <div class="predict-wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { analysis } from '@/api/analysis'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

  methods: {
    onSubmit() {
      let formData = {}
      for (let key in this.form) {
        formData[key] = this.form[key]
      }
      console.log(formData);
      analysis(formData).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
  .predict-wrap {
    padding: 20px;
  }
</style>