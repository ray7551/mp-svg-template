<template>
  <div id="app" class="admin-wrapper">
    <Editor/>
  </div>
</template>

<script>
import Editor from "./components/Editor";

export default {
  name: "App",
  components: {
    Editor
  }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
