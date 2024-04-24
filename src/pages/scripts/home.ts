// 个人添加
export const HomeJson = {
  className: 'login-box padding-left-right-48',
  data: {
    username: 'jayw',
    password: '123456',
    wechat: true
  },
  items: [
    {
      name: 'username',
      eltype: 'input',
      visible: true,
      maxlength: 20,
      minlength: 1,
      type: 'text',
      required: true,
      label: '请输入登录用户',
      labelClassName: 'margin-bottom-15',
      itemClassName: 'border-grey padding-15',
      placeholder: '请输入登录用户',
      className: 'margin-bottom-28'
    },
    {
      name: 'password',
      eltype: 'input',
      visible: true,
      maxlength: 20,
      minlength: 1,
      required: true,
      type: 'text',
      label: '请输入登录密码',
      placeholder: '请输入登录密码',
      labelClassName: 'margin-bottom-15',
      itemClassName: 'border-grey padding-15',
      className: 'margin-bottom-34'
    },
    {
      name: 'checkbox',
      eltype: 'tcp',
      visible: true,
      required: true,
      pattern: 'true',
      placeholder: '请勾选用户协议',
      className: 'margin-bottom-34'
    },
    {
      eltype: 'button',
      visible: true,
      align: 'left',
      className: 'margin-bottom-20',
      list: [
        {
          visible: true,
          validate: true,
          submit: authToken,
          text: '登录',
          className: 'button-primary padding-top-bottom-12'
        }
      ]
    },
    {
      name: '',
      eltype: 'content',
      placeholder: '忘记密码？',
      visible: true,
      required: true,
      path: '/pages/index/index',
      itemClassName: 'justify-end text-primary padding-right-10',
      className: 'margin-bottom-48'
    }
  ]
};

export const WeixinJson: any = {
  path: '/pages/index/index',
  submit: authWeixin,
  text: 'https://fire.diweiyunlian.cn/file/215574841988886528.png',
  openType: '',
  className: 'border-none',
  validate: [
    {
      name: 'checkbox',
      pattern: new RegExp('true', 'g'),
      required: true,
      placeholder: '请勾选用户协议'
    }
  ],
  params: [
    {
      label: 'code',
      value: 'code'
    },
    {
      label: 'iv',
      value: 'iv'
    },
    {
      label: 'encryptedData',
      value: 'encryptedData'
    }
  ]
};

export const loginWeixin = async ({ data }: any) => {
  await uniSetStorage('token', data);
  const res: any = await HttpRequest(permission);
  await uniSetStorage('userInfo', res);
  routerTo();
};

class dd {
  [x: string]: any;
  constructor(d: any) {
    this.d = d;
  }
}
