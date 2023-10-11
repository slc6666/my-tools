<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <el-button type="primary">Primary</el-button>
    <commonDialog></commonDialog>
  </div>
</template>

<script>
import { commonDialog } from "./package/index";
export default {
  name: "App",
  components: { commonDialog },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
