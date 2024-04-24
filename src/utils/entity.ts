/*
    @description        RequestEntity请求参数
    @author             songzi
    @params name        字段
    @params url         请求路径
    @params prefix      请求前缀
    @params type        请求类型
    @params data        请求数据
    @params loading     请求加载状态
    @params showMessage 响应请求提示
    @params once        请求次数
    @params headers     请求头
    @params queer       怪异请求 如：post请求/params参数
    @params name        文件名称
    @params request     若存在即文件上传或下载
    @params fileType    上传文件类型
    @params filePath    上传文件路径

*/
export interface RequestEntity {
  url: string;
  prefix: string;
  type: string;
  data: object | null;
  loading: string;
  showMessage: string;
  headers: object;
  queer: boolean;
  request: string;
  fileType: string;
  filePath: string;
  name: string;
}
/*
    @description        LableValueEntity请求参数
    @author             songzi
    @params label       字段
    @params value       值/字段值
    @params storage     判断缓存阈值        
    @params request      动态值获取
*/
export interface LableValueEntity {
  label: string;
  value: string;
  storage: string;
  static: string;
}

/*
    @description        loads请求参数
    @author             songzi
    @params load        请求数据
    @params name        字段
    @params request     动态字段值
    @params multiple    是否是多选择
    @params rreq        动态路由请求
    @params storage      是否从缓存中获取
    例子：[{
        load: api.lesseeEquipSystem,
        rreq: true,
        request: 'id',
        multiple: true,
        name: 'systemIdList',
    }]
*/
export interface loadEntity {
  load: RequestEntity;
  name: string;
  rreq: Array<LableValueEntity> | LableValueEntity;
  nonstop: LableValueEntity;
  multiple: boolean;
  request: string;
  storage: string;
}

/*
    @description        请求参数实体
    @author             songzi
    @params label       参数key
    @params value       参数值
    @params storage     是否缓存中获取
    @params multiple    数组传值
 */
export interface ParamsEntity {
  label: string;
  value: string;
  storage: string;
  multiple: boolean;
}

/*
    @description        图片组件单元
    @author             songzi
    @params path        跳转路路
    @params className   样式className
    @params src         处理函数
    @params preview     是否预览
    @params lazy        懒加载
    @params fit         适应方式
    @params alt         原生alt
 */

export interface ImageEntity {
  icon: string;
  className: string;
  path: string;
  lazy: boolean;
  fit: string;
  alt: string;
  preview: boolean;
}

export interface UploadEntity {
  placeholder: string;
  name: "";
}

/*
    @description            FormsEntity组件单元
    @author                 songzi
    @params inline          表单展示方式span赋值后无效;
    @params rules           表单验证
    @params loads           加载前表单请求;
    @params data            表单静态数据或动态数据;
    @params items           表单单元数据;
    @params className       表单className;
    @params disabled:       表单是否可操作;
    @params labelPosition   单元描述显示方向;
    @params statusIcon      表单验证状态;
    @params labelWidth      描述宽度;
    @params showMessage     验证错误信息是否显示;
    @params inlineMessage   验证信息显示方式;
    @params span            表单显示多列;
    @params gutter          每列间距;
 */
export interface FormsEntity {
  inline: boolean;
  rules: object;
  loads: Array<loadEntity>;
  data: object;
  items: Array<any>;
  className: string;
  disabled: boolean;
  labelPosition: string;
  statusIcon: boolean;
  labelWidth: string;
  showMessage: boolean;
  inlineMessage: boolean;
  span: number;
  gutter: number;
}

/*
    @description                SublevelEntity组件单元
    @author                     songzi
    @params name                字段
    @params label               地段描述
    @params placeholder         占位描述
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params itemClassName       className类名
    @params iconClassName      图片className类名
    @params  list               多数据列表
    @params component           动态组件
    @params path                跳转路路
    @params type                单元类型
    @params eltype              节点类型
    @params params              <LableValueEntity>请求参数
    @params rules               单元验证
    @params className           样式className
    @params visible             节点显示
    @params request             获取对应的返回数据
    @params multiple            选择多个字段
    @params rreq                动态路由方式请求(url:`path/${rreq}`) rreq:'id';
    @params props               参数配置
    @params change              <loadEntity>change请求
    @params load                <loadEntity>load请求
    @params control:            <LableValueEntity>控制字段
    @params change:             <LableValueEntity>控制字段
 */

export interface SublevelEntity {
  name: string;
  type: string;
  eltype: string;
  label: string;
  disabled: boolean;
  placeholder: string;
  component: string;
  params: Array<ParamsEntity>;
  path: string;
  props: LableValueEntity;
  className: string;
  list: Array<any>;
  labelStyle: string;
  labelClassName: string;
  itemClassName: string;
  itemStyle: string;
  iconClassName: string;
  iconStyle: string;
  visible: boolean;
  multiple: boolean;
  request: string;
  rreq: Array<LableValueEntity>;
  control: Array<LableValueEntity>;
}

/*
    @description                ItemEntity组件单元
    @author                     songzi
    @params name                字段
    @params label               地段描述
    @params placeholder         占位描述
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params labelClassName      label className类名
    @params itemClassName       className类名
    @params iconClassName      图片className类名
    @params list               多数据列表
    @params component           动态组件
    @params path                跳转路路
    @params type                单元类型
    @params eltype              节点类型
    @params params              <LableValueEntity>请求参数
    @params rules               单元验证
    @params className           样式className
    @params visible             节点显示
    @params request             获取对应的返回数据
    @params multiple            选择多个字段
    @params rreq                动态路由方式请求(url:`path/${rreq}`) rreq:'id';
    @params props               参数配置
    @params change              <loadEntity>change请求
    @params load                <loadEntity>load请求
    @params control:            <LableValueEntity>控制字段
    @params change:             <LableValueEntity>控制字段
 */

export interface ItemEntity {
  name: string;
  type: string;
  eltype: string;
  label: string;
  disabled: boolean;
  placeholder: string;
  component: string;
  params: Array<ParamsEntity>;
  path: string;
  props: LableValueEntity;
  className: string;
  list: Array<any>;
  labelStyle: string;
  labelClassName: string;
  itemClassName: string;
  itemStyle: string;
  iconClassName: string;
  iconStyle: string;
  visible: boolean;
  multiple: boolean;
  request: string;
  rreq: Array<LableValueEntity>;
  control: Array<LableValueEntity>;
}

export interface ButtonEntity {
  className?: string;
  text?: string;
  icon?: string;
  mode?: string;
  iconClassName?: string;
}
