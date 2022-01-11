<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link
      v-for="app in data.microAppList"
      :key="app.name"
      :to="
        app.activeRule.includes('/#')
          ? app.activeRule.split('/#')[1]
          : app.activeRule
      "
      >{{ app.name }}</router-link
    >
  </div>
  <div class="router-container">
    <router-view />
  </div>
  <div id="subAppContainer"></div>
</template>
<script lang="ts">
import { reactive } from "@vue/reactivity";
import startQianKun, {
  fetchMicroAppList,
  registerApps,
  MicroAppList,
} from "./router/micro";

export default {
  setup() {
    const data = reactive({
      microAppList: [] as MicroAppList,
    });
    // 获取子组件app列表
    fetchMicroAppList().then((microList) => {
      // 注册子组件app
      registerApps(microList);
      // 启动qiankun主程序
      startQianKun();
      console.log(microList);
      data.microAppList = microList;
    });
    return {
      data,
    };
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
