
const persist: any = {
  enabled: true,
  H5Storage: window?.localStorage
};

export const useConfig: any = defineStore({
  id: "config",
  state() {
    return {
      appVersion: "pc" as string,
      theme: {
        status: "Sunny"
      },
      loading: true
    };
  },
  getters: {
    getPageLoad(state) {
      return state.loading;
    },
    getAppTheme(state) {
      return state.theme;
    },
    getAppVersion(state) {
      return state.appVersion;
    }
  },
  actions: {
    setPageLoad(data: any) {
      this.loading = data;
    },
    setAppTheme(data: any) {
      this.theme = data;
    },
    setAppVersion(data: string) {
      this.appVersion = data;
    }
  },
  persist
});

export const useToken: any = defineStore({
  id: "token",
  state() {
    return {
      token: "" as string
    };
  },
  getters: {
    getToken(state: any) {
      return state.token;
    }
  },
  actions: {
    setToken(data: string = "") {
      this.token = data;
    }
  },
  persist
});

export const useUserInfo: any = defineStore({
  id: "userInfo",
  state() {
    return {
      userInfo: {} as object
    };
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  actions: {
    setUserInfo(datas: Object = {}) {
      this.userInfo = datas;
    }
  },
  persist
});

export const useDictList: any = defineStore({
  id: "dictList",
  state() {
    return {
      dictjson: {} as any
    };
  },
  getters: {
    getDictList(state) {
      return (type: string) => state.dictjson[type];
    }
  },
  actions: {
    setDictList(res: any) {
      if (res?.type) {
        this.dictjson[res?.type] = res?.data;
      } else {
        this.dictjson = res;
      }
    }
  },
  persist
});
// 详情
export const useDetails: any = defineStore({
  id: "details",
  state() {
    return {
      detalis: {} as any
    };
  },
  getters: {
    getDetails(state) {
      return state.detalis;
    }
  },
  actions: {
    setDetails(data: any) {
      this.detalis = data;
    }
  },
  persist
});

// 用户信息
export const setUserInfo = (data: any) => useUserInfo().setUserInfo(data);
export const getUserInfo = () => useUserInfo().getUserInfo;
// 设置TOKEN
export const setToken = (data: string) => useToken().setToken(data);
export const getToken = () => useToken().getToken;

export const setAppVersion = (data: any) => useConfig().setAppVersion(data);
export const getAppVersion = () => useConfig().getAppVersion;

// 主题
export const setAppTheme = (data: any) => useConfig().setAppTheme(data);
export const getAppTheme = () => useConfig().getAppTheme;
// 字典
export const setDictList = (data: any) => useDictList().setDictList(data);
export const getDictList = (type: string) => useDictList().getDictList(type);
// 设置详情
export const setDetails = (data: any) => useDetails().setDetails(data);
export const getDetails = () => useDetails().getDetails;
export const setPageLoad = (data: any) => useConfig().setPageLoad(data);
export const getPageLoad = () => useConfig().getPageLoad;

export const resetPinia = () => {
  setUserInfo({});
  setToken("");
  setAppTheme({});
  setDictList({});
  setDetails({});
};
