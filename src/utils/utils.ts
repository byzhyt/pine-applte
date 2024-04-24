import type { LableValueEntity } from "./entity";

export const dataEmpty = (item: any) => {
  const emptyJson: any = {
    b: false,
    s: "",
    a: [],
    n: null,
    m: 0,
    o: {},
  };
  return emptyJson[item.dataType || "s"];
};

// 参数获取
export const getName = (item: any) => {
  return item.request || item.name;
};

// 获取全局参数
export const uniGetApp = (name: string) => {
  const app: any = getApp();
  return app.globalData[name];
};
// 设置全局参数
export const uniSetApp = (name: string, value: any) => {
  const app: any = getApp();
  app.globalData[name] = value;
};

// 判断值是否为对象
export const isObject = (val: any) => {
  if (Object.isExtensible(val) && !Array.isArray(val)) {
    return true;
  } else {
    return false;
  }
};
// 设置参数值
export const isNull = (data: any, item: any = {}) => {
  if ([null, undefined].includes(data)) {
    return dataEmpty(item);
  } else {
    return data;
  }
};

// 查找json指定的数据
export const findObjectValue = (datas: any, name: string) => {
  let value: any = "";
  const names: Array<any> = name.split(".");
  const findValue = async (data: any, sname: string) => {
    for (const key in data) {
      if (sname == key) {
        if (isObject(data[sname]) && names.length) {
          await findValue(data[sname], names.shift());
        } else {
          value = data[sname];
          break;
        }
      }
    }
  };
  findValue(datas, names.shift());
  return value;
};
// 验证方法
export const verifyData = ({ data, items = [], item = null }: any) => {
  let loop = true;
  let list = items;
  if (item && Array.isArray(item.validate) && item.validate) {
    list = item.validate;
  }
  for (const sitem of list) {
    sitem.activeClassName = isNull(sitem.activeClassName);
    sitem.itemClassName = isNull(sitem.itemClassName);
    for (const name in data) {
      if (sitem.name == name && sitem.required && getName(sitem)) {
        sitem.itemClassName = sitem.itemClassName.replace(
          sitem.activeClassName ?? "",
          ""
        );
        if (sitem.pattern) {
          if (!new RegExp(sitem.pattern).test(data[getName(sitem)])) {
            sitem.itemClassName += sitem.activeClassName ?? "";
            showToast(sitem.placeholder);
            loop = false;
            break;
          }
        } else {
          if (!new RegExp(/\S+/).test(data[getName(sitem)])) {
            sitem.itemClassName += sitem.activeClassName ?? "";
            showToast(sitem.placeholder);
            loop = false;
            break;
          }
        }
      }
    }
  }

  return loop;
};

// 重置列表数据
export const setInitList = (list: Array<object>, formjson: any, item: any) =>
  list.map((sitem: any, key) => {
    const { label, value } = item.props;

    const activeName = findObjectValue(formjson, item.name);
    sitem = Object.assign({}, item, {
      index: key,
      visible: true,
      active: activeName == sitem.label ? key : 0,
      label: sitem[label],
      value: isNull(sitem[value], sitem),
    });
    return sitem;
  });
// 请求参数处理
export const setParamsJson = (item: any, datas: any) => {
  const userInfo: any = uniGetApp("userInfo");
  const load = item.load || {};
  const rreq: LableValueEntity = item.rreq;
  const nonstop: LableValueEntity = item.nonstop;
  if (Object.isExtensible(rreq) && rreq.label) {
    if (rreq.storage) {
      load.url = load.url.replace(/rreq/g, userInfo[rreq.label]);
    } else if (rreq.static) {
      load.url = load.url.replace(/rreq/g, rreq.value);
    } else {
      load.url = load.url.replace(/rreq/g, datas[rreq.label]);
    }
  }
  const tempjson = {
    ...load,
    data: {},
  };
  if (Array.isArray(item.params)) {
    item.params.map((pitem: LableValueEntity) => {
      if (pitem.storage) {
        tempjson.data[pitem.label] = isNull(userInfo[pitem.value], pitem);
      } else if (pitem.static) {
        tempjson.data[pitem.label] = pitem.value;
      } else {
        tempjson.data[pitem.label] = isNull(datas[pitem.value], pitem);
      }
    });
  }
  // 特殊请求包体
  if (Object.isExtensible(nonstop)) {
    if (nonstop.storage) {
      tempjson.data = [isNull(userInfo[nonstop.label], nonstop)];
    } else if (nonstop.static) {
      tempjson.data = [nonstop.value];
    } else {
      tempjson.data = [isNull(datas[nonstop.label], nonstop)];
    }
  }

  tempjson.data = Object.assign({}, datas, tempjson.data);
  // 怪异请求
  if (item.queer && tempjson.type == "post") {
    tempjson.url = `${tempjson.url}?${jsonToGetData(tempjson.data)}`;
    delete tempjson.data;
  }
  return tempjson;
};
export const maxnum = (arr: Array<number> = []) => {
  return arr.reduce((num1, num2) => {
    return num1 > num2 ? num1 : num2;
  });
};
export const setyAxisMax = (data: Array<number> = []) => {
  const max = maxnum(data) >= 5 ? maxnum(data) * 1.09 : 5;
  return {
    data: [
      {
        min: 0,
        max: Math.ceil(max),
      },
    ],
  };
};
// 百度转腾讯
export const bMapToQQMap = ({ longitude, latitude }: any) => {
  var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var x = parseFloat(longitude) - 0.0065;
  var y = parseFloat(latitude) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

  return {
    longitude: z * Math.cos(theta),
    latitude: z * Math.sin(theta),
  };
};
// 腾讯转百度
export const QQMapTobMap = ({ longitude, latitude }: any) => {
  var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var y = longitude;
  var x = latitude;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);

  return {
    longitude: z * Math.cos(theta) + 0.0065,
    latitude: z * Math.sin(theta) + 0.0065,
  };
};
// 补全两位数
export const fillNumber = (n: number | string) => {
  return Number(n) < 10 ? "0" + n : n;
};
// 获取随机数
export const random = (s: string | number, e: string | number) => {
  const m = Number(s),
    n = Number(e);
  return Math.floor(Math.random() * (m - n) + n);
};
// 设置有位数随机数
export const randomText = (len: number = 20, type: string = "str") => {
  let result: string = "";
  for (let i = 0; i < len; i++) {
    if (random(0, random(1, 6)) || type == "num") {
      result += random(0, 10);
    } else {
      if (random(0, random(1, 3))) {
        result += String.fromCharCode(random(65, 90));
      } else {
        result += String.fromCharCode(random(97, 122));
      }
    }
  }
  return result;
};
// 数组去重
export const arrayToOnly = (list: Array<string | number | object>) => {
  const empson: any = {};
  return list.reduce((item: any, next: any) => {
    if (next instanceof Object) {
      empson[next.id] ? "" : (empson[next.id] = true) && item.push(next);
    } else {
      empson[next] ? "" : (empson[next] = true) && item.push(next);
    }
    return item;
  }, []);
};

// 请求数据处理
export const beforeAxiosEnter = (item: any, datas: any) => {
  const userInfo: any = {};
  const load: any = item.load;
  const rreq: any = item.rreq;
  const nonstop: LableValueEntity = item.nonstop;
  if (isObject(rreq) && rreq.label && isObject(datas)) {
    if (rreq.storage) {
      load.url = load.url.replace(/rreq/g, userInfo[rreq.label]);
    } else if (rreq.static) {
      load.url = load.url.replace(/rreq/g, rreq.value);
    } else {
      load.url = load.url.replace(/rreq/g, datas[rreq.label]);
    }
  }
  const tempjson: any = {
    ...load,
    data: {},
  };
  if (Array.isArray(item.params) && isObject(datas)) {
    item.params.map((pitem: any) => {
      if (pitem.storage) {
        tempjson.data[pitem.label] = isNull(userInfo[pitem.value]);
      } else if (pitem.static) {
        tempjson.data[pitem.label] = pitem.value;
      } else {
        tempjson.data[pitem.label] = isNull(datas[pitem.value]);
      }
    });
  }
  // 特殊请求包体
  if (isObject(nonstop) && isObject(datas)) {
    if (nonstop.storage) {
      tempjson.data = [isNull(userInfo[nonstop.label])];
    } else if (nonstop.static) {
      tempjson.data = [nonstop.value];
    } else {
      tempjson.data = [isNull(datas[nonstop.label])];
    }
  }
  if (isObject(datas)) {
    tempjson.data = tempjson.data;
  } else {
    tempjson.data = datas;
  }

  // 怪异请求
  if (!(datas instanceof FormData) && item.queer && tempjson.type == "post") {
    tempjson.url = `${tempjson.url}?${jsonToGetData(tempjson.data)}`;
    delete tempjson.data;
  }
  return tempjson;
};

export const validation: any = {
  // 手机号
  phone: /^1[3-5,7-9]\d{9}$/,
  // 座机号码
  tel: /(^0[1-9]{2,3}\d{7,8}$)|(^[1-9]\d{6,7}$)/,
  // 整数
  inter: /(^[1-9]+$)|(^[1-9]\d+$)/,
  // 浮点数
  float: /(^0\.\d{1,2}$)|(^[1-9]\d+\.\d{1,2}$)/,
  // 身份证
  iden: /(^[1-9]{3}[A-Z,1-9]$)/,
  // 信用卡
  credit: /^4$/,
  // 银行卡
  bank: /(^62\d{16}|\d{19}|\d{13}|\d{17}$)|(^[37,34]\d{13}$)|(^[30,36,38,39]\d{12}$)|(^5[1-5]\d{14}$)|(^4\d{15}$)/,
  // 日期
  date: /(^[1,2]\d{3}?\-(0[1-9]|[1-9]|1[0,1,2])\-(0[1-9]|1[1-9]|2[1-9]|3[0,1])\s([])$)/,
  // 文本信息
  content: /^\S+$/,
};

export const jsonToGetData = (data: any) => {
  let tempjson = "";
  for (const name in data) {
    if (name) {
      tempjson += `${name}=${isNull(data[name])}&`;
    }
  }
  return tempjson.replace(/\&$/, "");
};

// 日历
export const calendar = async (year: any, month: any, today: any) => {
  let sDate = new Date();
  let todayText = today || sDate.getDate();
  let yearText = year || sDate.getFullYear();
  let monthText = month || sDate.getMonth() + 1;
  let dateList = [];
  // 获取上个月最后一天是几号/星期几
  sDate.setFullYear(yearText, monthText - 1, 0);
  let week = sDate.getDay();
  let endDay = sDate.getDate();
  for (let i = endDay - week + 1; i <= endDay; i++) {
    dateList.push({
      day: i,
      loop: false,
      year: yearText,
      month: monthText - 1,
    });
  }
  // 获取当月有多少天数
  sDate.setFullYear(yearText, monthText, 0);
  for (let i = 1; i <= sDate.getDate(); i++) {
    dateList.push({
      day: i,
      loop: true,
      year: yearText,
      month: monthText,
    });
  }

  // 获取当月最后一天星期几
  sDate.setFullYear(yearText, monthText - 1, sDate.getDate());
  let nweek = sDate.getDay() ? sDate.getDay() : 7;
  for (let i = 1; i <= 7 - nweek; i++) {
    dateList.push({
      day: i,
      loop: false,
      year: yearText,
      month: monthText + 1,
    });
  }

  Promise.resolve({
    yearText: yearText,
    todayText: todayText,
    monthText: monthText,
    dateList: dateList,
  });
};
// 判断场景值
export const uniGetScene = ({ scene }: any) => {
  switch (scene) {
    // 扫描小程序码
    case 1047:
      break;
    // 扫描二维码
    case 1011:
      break;
    // 小程序模板消息
    case 1014:
      break;
  }
};
// 显示操作菜单
export const showActionSheet = async (
  itemList: Array<any> = [],
  itemColor: any = "#4f9aeb"
) => {
  const list = itemList.map((item: { label: any }) => {
    return item.label;
  });
  return uni.showActionSheet({
    itemList: list,
    itemColor: itemColor,
    success(res) {
      Promise.resolve(
        itemList.map((el: any, i: any) => {
          return i == res.tapIndex && el;
        })
      );
    },
    fail(res) {
      Promise.reject(res);
    },
  });
};
// 调起客户端扫码界面进行扫码
export const scanCode = async () => {
  uni.scanCode({
    onlyFromCamera: false,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 打开地图选择位置
export const chooseLocation = async (options: any = {}) => {
  uni.chooseLocation({
    ...options,
    success(res: object) {
      Promise.resolve(res);
    },
    fail(error: any) {
      Promise.reject(error);
    },
  });
};
// 使用微信内置地图查看位置
export const openLocation = async (options: any) => {
  uni.openLocation({
    latitude: Number(options.latitude),
    longitude: Number(options.longitude),
    name: options.name,
    scale: options.scale || 15,
    address: options.address,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 获取系统信息
export const getSystemInfo = async () => {
  uni.getSystemInfo({
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};

// 使用微信内置地图查看位置
export const getLocation = async () => {
  uni.getLocation({
    type: "wgs84",
    altitude: true,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
export const setNavigationBarTitle = async (title: string = "") => {
  uni.setNavigationBarTitle({
    title,
    success(res) {
      Promise.resolve(res);
    },
    fail(res) {
      Promise.reject(res);
    },
  });
};
// 从本地相册选择图片或使用相机拍照
export const chooseImage = async (count: any = 0) => {
  uni.chooseImage({
    count: count,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success(res) {
      Promise.resolve(res.tempFiles);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 在新页面中全屏预览图片
export const previewImage = (urls: Array<any>, current: number = 0) => {
  uni.previewImage({
    current,
    urls: urls,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 关闭所有页面，打开到应用内的某个页面
export const reLaunch = (url: string) => {
  uni.reLaunch({
    url: url,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
export const redirectTo = (url: string) => {
  uni.redirectTo({
    url: url,
    success(res) {
      Promise.resolve(res);
    },
    fail(res) {
      Promise.reject(res);
    },
  });
};
// 跳转到 tabars 页面，并关闭其他所有非 tabars 页面
export const switchTab = async (url: string) => {
  uni.switchTab({
    url: url,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 关闭当前页面
export const navigateBack = async (delta: number = 1) => {
  uni.navigateBack({
    delta: delta,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 保留当前页面
export const navigateTo = async (url: string = "") => {
  uni.navigateTo({
    url: url,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 显示消息提示框
export const showToast = async (options: string | any = "温馨提示") => {
  const title = typeof options == "string" ? options : options.title;
  return uni.showToast({
    title: title,
    icon: options.icon || "none",
    image: options.image || "",
    mask: false,
    success() {
      Promise.resolve();
    },
    fail() {
      Promise.reject();
    },
  });
};
// 获取服务供应商
export const getProvider = async (service: any = "oauth") => {
  uni.getProvider({
    service,
    success(res) {
      Promise.resolve(res.provider[0]);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};

// 调用接口获取登录凭证
export const unilogin = async (scopes: any) => {
  getProvider().then((provider: any) =>
    uni.login({
      provider,
      scopes: scopes || "auth_user",
      univerifyStyle: {
        fullScreen: true,
      },
      success(res) {
        Promise.resolve(res);
      },
      fail(error) {
        Promise.reject(error);
      },
    })
  );
};
// 获取手机号
export const getPhoneNumber = async (res: any) => {
  if (["getPhoneNumber:ok"].includes(res.errMsg)) {
    Promise.resolve(res);
  } else {
    Promise.reject("非常抱歉您已取消了授权");
  }
};

// 拨打电话
export const makePhoneCall = async (phoneNumber: any) => {
  uni.makePhoneCall({
    phoneNumber: phoneNumber,
    success() {
      Promise.resolve(true);
    },
    fail() {
      Promise.reject(false);
    },
  });
};
// 显示模态对话框
export const showModal = async (options: any) => {
  let loop = false;
  const content = typeof options == "string" ? options : options.content;
  return uni.showModal({
    title: options.title || "温馨提示",
    content: content || "",
    showCancel: options.showCancel || true,
    cancelText: options.cancelText || "取消",
    cancelColor: options.cancelColor || "",
    confirmColor: options.confirmColor || "#4f9aeb",
    confirmText: options.confirmText || "确认",
    success(res) {
      loop = res.confirm ? true : false;
      Promise.resolve(loop);
    },
  });
};
// 将数据存储在本地缓存中指定的
export const uniSetStorage = async (key: string, data: any) => {
  uni.setStorage({
    key: key,
    data: data,
    success(res) {
      Promise.resolve(res);
    },
    fail(error) {
      Promise.reject(error);
    },
  });
};
// 从本地缓存中异步获取指定
export const uniGetStorage = async (key: string) => {
  return await uni.getStorage({
    key: key,
    success(res) {
      Promise.resolve(res.data);
    },
    fail(error) {
      Promise.resolve(null);
    },
  });
};
export const getElementStyle = async (el: string, _this: any) => {
  const view: any = uni.createSelectorQuery().in(_this).select(el);
  view
    .fields(
      {
        size: true,
        rect: true,
        dataset: true,
        scrollOffset: true,
      },
      (data: any) => Promise.resolve(data)
    )
    .exec();
};

export const routerTo = async () => {
  const token = await uniGetStorage("token");
  const userInfo: any = await uniGetStorage("userInfo");
  let path = "/pages/login/login";
  if (token && userInfo) {
    path = "/pages/home/home";
    switchTab(path);
  } else {
    reLaunch(path);
  }
};
