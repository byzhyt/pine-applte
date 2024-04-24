// 账号登录

export const loginPage = {
  className: 'login-box',
  items: [
    {
      eltype: 'content',
      type: 'image',
      visible: true,
      required: true,
      placeholder: '../../static/image/icon-logo.png',
      imageClassName: 'height-150 width-full',
      className: 'login-logo'
    },

    {
      name: 'username',
      eltype: 'input',
      visible: true,
      maxlength: 20,
      minlength: 1,
      type: 'text',
      required: true,
      placeholder: '请输入登录用户',
      className: 'login-item margin-bottom-40'
    },
    {
      name: 'pwd',
      visible: true,
      eltype: 'input',
      maxlength: 20,
      minlength: 1,
      required: true,
      type: 'password',
      placeholder: '请输入登录密码',
      className: 'login-item margin-bottom-40'
    },
    {
      name: 'code',
      visible: true,
      eltype: 'tcp',
      maxlength: 20,
      minlength: 1,
      required: true,
      placeholder: '',
      className: 'margin-bottom-60'
    },
    {
      eltype: 'button',
      visible: true,
      className: 'login-button',
      list: [
        {
          img: 'iconfont icon-arrow-right',
          className: 'button-text'
        }
      ]
    }
  ]
};
export const loginPost = (data: any) => {
  HttpRequest(
    beforeAxiosEnter(
      {
        load: {
          url: '/user/login',
          data: data,
          showMessage: true
        }
      },
      data
    )
  );
};
