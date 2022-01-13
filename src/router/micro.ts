import { registerMicroApps, start, RegistrableApp, ObjectType } from "qiankun";

export declare type MicroAppList = Array<RegistrableApp<ObjectType>>;

const microList: MicroAppList = [
  {
    name: "vue3 app", // app name registered
    entry: "//localhost:9080",
    container: "#subAppContainer",
    activeRule: "/#/vue3",
  },
  {
    name: "jquery app",
    entry: "//localhost:9081",
    container: "#subAppContainer",
    activeRule: "/#/jquery",
  },
];

export const fetchMicroAppList = (): Promise<MicroAppList> => {
  return new Promise((resolve) => setTimeout(() => resolve(microList), 0));
};

export const registerApps = registerMicroApps;

export default start;
