<template>
  <el-aside width="200px">
    <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
      <el-menu-item index="1" @click="goTo('predict')">
        <i class="el-icon-document"></i>
        <span slot="title">病情预测</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('map')">
        <i class="el-icon-info"></i>
        <span slot="title">知识图谱</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    goTo(index) {
      this.$router.push(index)
    }
  },
}
</script>

<style>
  .el-aside {
    background-color: #444;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }

  .el-menu-item {
    background-color: #444;
    color: #fff;
    border: #444;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>