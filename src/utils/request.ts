import type { RequestEntity } from "@/utils/entity";

let configRequest: any = null;
export const path = () => {
  const app: any = getApp();
  return app.globalData.request;
};
// 请求前处理函数
export const configRequestFunction = async (config: any) => {
  if (config.loading) {
    uni.showLoading({
      title: config.loading || "加载中",
    });
  }
  config.header = Object.assign(
    {},
    {
      version: "1",
      "Content-Type": "application/json;charset=utf-8;",
    },
    config.headers
  );
  const token = await uniGetStorage("token");
  if (token) {
    config.header.Authorization = token || "";
  }
  configRequest = config;
  return config;
};

// 请求失败处理函数
export const httpErrorFunction = async ({ errMsg }: any) => {
  showToast(errMsg);
  // 关闭loading
  uni.hideLoading();
  return errMsg;
};

// 请求成功处理
export const httptResponseFunction = (response: any) => {
  configRequest.loading && uni.hideLoading();
  let data: any = {};
  if (configRequest.name) {
    // data = JSON.parse(response.data);
    // data.errorMessage = data.data.code == 1 ? '上传文件成功' : '上传文件失败'
  } else {
    data = response.data;
  }
  let result = {
    code: data.code,
    message: "",
  };

  if (data.code == 1) {
    result.message = configRequest.showMessage || data.errorMessage;
  } else {
    result.message = data.errorMessage;
  }

  // 数据响应提示
  if (configRequest.showMessage) {
    showToast(result.message);
  }

  // 数据处理
  if (/string/.test(typeof data.data)) {
    result = Object.assign({}, result, {
      data: data.data,
    });
  } else if (Array.isArray(data.data)) {
    result = Object.assign({}, result, {
      data: data.data,
    });
  } else {
    result = Object.assign({}, result, data.data);
  }

  return result;
};

// 请求参数组合
export const HttpRequestConfig = (options: RequestEntity) => {
  const { url, prefix, queer, type, data, loading, showMessage, headers } =
    options;
  let httpPath = "";
  if (queer) {
    httpPath = `${prefix || ""}${url}?${jsonToGetData(data || {})}`;
  } else {
    httpPath = `${prefix || ""}${url}`;
  }

  return {
    url: path() + httpPath,
    method: type,
    params: ["get", "delete", "head"].includes(type) ? data : null,
    data: ["post", "put", "patch"].includes(type) ? data : null,
    loading,
    showMessage,
    header: headers,
  };
};
// 请求参数组合
export const FileRequestConfig = (options: RequestEntity) => {
  const { request, name, data, fileType, filePath, headers } = options;
  let httpPath = "";
  if (request == "upload") {
    return {
      url: path() + httpPath,
      fileType: fileType || "image",
      filePath,
      name,
      formData: data || {},
      header: headers || {},
    };
  } else {
    return {
      url: path() + httpPath,
      filePath,
      header: headers || {},
    };
  }
};
// 请求前处理函数
export const HttpRequest = async (option: any) => {
  const config = await configRequestFunction(HttpRequestConfig(option));

  const task = uni.request({
    ...config,
    success: (res: any) => {
      if (res.errorCode == "A006") {
        uni.clearStorage();
        routerTo();
      } else {
        const datas = httptResponseFunction(res);
        datas.code == 1 ? Promise.resolve(datas) : Promise.reject(datas);
      }
    },
    fail: (res: any) => Promise.reject(httpErrorFunction(res)),
  });
  uniSetApp("task", task);
};

export const FileRequest = async (option: any) => {
  const config = await configRequestFunction(FileRequestConfig(option));
  let task: any = null;
  if (option.request == "upload") {
    task = uni.uploadFile({
      ...config,
      success: (res: any) => {
        const datas = httptResponseFunction(res);
        datas.code == 1 ? Promise.resolve(datas) : Promise.reject(datas);
      },
      fail: (res: any) => Promise.reject(httpErrorFunction(res)),
      complete() {
        config.loading && uni.hideLoading();
      },
    });
  } else {
    task = uni.downloadFile({
      ...config,
      success: (res: any) => {
        const datas = httptResponseFunction(res);
        datas.code == 1 ? Promise.resolve(datas) : Promise.reject(datas);
      },
      fail: (res: any) => Promise.reject(httpErrorFunction(res)),
      complete() {
        config.loading && uni.hideLoading();
      },
    });
  }

  task.onProgressUpdate((res: any) => {
    console.log("上传进度" + res.progress);
    console.log("已经上传的数据长度" + res.totalBytesSent);
    console.log("预期需要上传的数据总长度" + res.totalBytesExpectedToSend);

    // 测试条件，取消上传任务。
    if (res.progress > 50) {
      task.abort();
    }
  });
  uniSetApp("task", task);
};
