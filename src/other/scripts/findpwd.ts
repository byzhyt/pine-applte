import { authToken } from '@/utils/api';
// 账号登录
export default {
  className: 'login-box',
  data: {
    username: '',
    password: '',
    wechat: true
  },
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
      name: 'pwd',
      eltype: 'input',
      visible: true,
      maxlength: 20,
      minlength: 1,
      type: 'text',
      required: true,
      placeholder: '请输入旧密码',
      className: 'login-item margin-bottom-40'
    },

    {
      name: 'newPwd',
      eltype: 'input',
      visible: true,
      maxlength: 20,
      minlength: 1,
      required: true,
      type: 'password',
      placeholder: '请输入新密码',
      className: 'login-item margin-bottom-80'
    },
    {
      eltype: 'button',
      visible: true,
      className: 'login-button',
      list: [
        {
          visible: true,
          path: '-1',
          load: authToken,
          img: 'iconfont icon-arrow-right',
          className: 'button-text'
        }
      ]
    }
  ]
};
