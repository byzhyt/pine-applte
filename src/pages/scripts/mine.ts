export const MineJson = {
  className: '',
  buttomJson: {
    visible: true,
    text: '退出登录',
    className: 'button-primary padding-top-bottom-12'
  },
  items: [
    {
      className: 'padding-top-bottom-20 border-bottom-grey',
      label: '修改密码',
      value: '',
      path: '/other/findpwd/findpwd',
      prefixIcon: 'https://fire.diweiyunlian.cn/file/218792271106818048.png',
      prefixIconClassName: 'width-80 height-80',
      suffixIcon: 'icon-enter',
      suffixIconClassName: 'font-50 text-lesser',
      visible: true
    },
    {
      className: 'padding-top-bottom-20 border-bottom-grey',
      label: '使用说明书',
      value: '',
      prefixIcon: 'https://fire.diweiyunlian.cn/file/162002449068785664.png',
      prefixIconClassName: 'width-80 height-80',
      suffixIcon: 'icon-enter',
      path: '/other/webview/webview?type=leaflet',
      suffixIconClassName: 'font-50 text-lesser',
      visible: true
    },
    {
      eltype: 'button',
      className: 'padding-top-bottom-20 border-bottom-grey margin-bottom-80',
      label: '联系客服',
      openType: 'contact',
      sessionFrom: 'https://work.weixin.qq.com/kfid/kfc1fe90d34b71cdb92',
      prefixIcon: 'https://fire.diweiyunlian.cn/file/162005949316136960.png',
      prefixLabelClassName: 'font-28',
      prefixIconClassName: 'width-80 height-80',
      suffixIcon: 'icon-enter',
      suffixIconClassName: 'font-50 text-lesser',
      visible: true
    }
  ]
};

export const AvatarJson = {
  text: 'https://fire.diweiyunlian.cn/file/215574841988886528.png',
  openType: 'getUserInfo',
  className: 'border-none',
  path: ''
};
