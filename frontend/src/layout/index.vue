<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-container>
      <sidebar></sidebar>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from "./components/MyHeader";
import Sidebar from "./components/Sidebar";
import AppMain from "./components/AppMain";

export default {
  name: "Layout",
  components: {
    MyHeader,
    Sidebar,
    AppMain
  }
};
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
}
.el-header {
  padding: 0;
}
</style>
