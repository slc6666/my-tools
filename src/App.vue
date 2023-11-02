<template>
  <div id="app">
    <initDialog :visiable.sync="a">
      <template slot="title"
        >fdsfsdf <span class="blue">怎么说</span> pplpjo</template
      >
      <template slot="desc">fdsfsdf <span class="blue">怎么说</span> </template>
    </initDialog>
    000
  </div>
</template>

<script>
import { initDialog, request } from "./package/index";
export default {
  name: "App",
  components: { initDialog },
  data() {
    return {
      a: false,
    };
  },

  async mounted() {
    let a = await request.getActiveTopText();
    console.log(a);
  },
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
