import { registerMicroApps, start, RegistrableApp, ObjectType } from "qiankun";

export declare type MicroAppList = Array<RegistrableApp<ObjectType>>;

const microList: MicroAppList = [
  {
    name: "vue3 app", // app name registered
    entry: "//localhost:8080",
    container: "#subAppContainer",
    activeRule: "/#/vue3",
  },
  {
    name: "vue app",
    entry: { scripts: ["//localhost:7100/main.js"] },
    container: "#subAppContainer",
    activeRule: "/yourActiveRule2",
  },
];

export const fetchMicroAppList = (): Promise<MicroAppList> => {
  return new Promise((resolve) => setTimeout(() => resolve(microList), 0));
};

export const registerApps = registerMicroApps;

export default start;
