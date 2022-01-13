<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <template v-for="app in data.microAppList" :key="app.name">
       |
      <router-link
        :to="
          app.activeRule.includes('/#')
            ? app.activeRule.split('/#')[1]
            : app.activeRule
        "
        >{{ app.name }}</router-link
      >
     
    </template>
  </div>
  <div class="router-container">
    <router-view />
  </div>
  <button @click="sendMessage">发送消息</button>
  <textarea v-model="data.message" readonly />
  <div id="subAppContainer"></div>
</template>
<script lang="ts">
import { reactive } from "@vue/reactivity";
import { defineComponent } from "vue";
import startQianKun, {
  fetchMicroAppList,
  registerApps,
  MicroAppList,
} from "./router/micro";
import emitter from "./mitt";
import { addGlobalUncaughtErrorHandler } from "qiankun";

export default defineComponent({
  name: "AppMain",
  setup() {
    const data = reactive({
      microAppList: [] as MicroAppList,
      message: "",
    });

    emitter.on("frame", (msg) => {
      data.message = JSON.stringify(msg);
    });

    const sendMessage = function () {
      emitter.emit("vue3", { data: "message by frame" });
    };
    // 获取子组件app列表
    fetchMicroAppList().then((microList) => {
      addGlobalUncaughtErrorHandler((event) => {
        console.log(event);
      });
      // 注册子组件app
      registerApps(microList.map((app) => ({ ...app, props: { emitter } })));
      // 启动qiankun主程序
      startQianKun();
      data.microAppList = microList;
    });
    return {
      data,
      sendMessage,
    };
  },
});
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
