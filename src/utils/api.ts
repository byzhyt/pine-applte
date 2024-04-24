export const authWeixin = {
    url: "/auth/authorization/wx",
    type: "post",
    showMessage: '登录成功',
    loading: '登录上线中...'
}
export const authToken = {
    url: "/auth/authorization",
    type: "post",
    showMessage: '登录成功',
    loading: '登录上线中...'
}
export const permission = {
    url: "/sysUser/data/permission",
    type: "get",
    prefix: '/basics-api',
}
export const equipAlarmNotice = {
    prefix: '/basics-api',
    showLoading: true,
    type: "get",
    url: "/equipAlarm/data/person/list5",
}


export const personUnit = {
    url: "/personUnit/data/personUnit",
    type: "post",
    prefix: '/basics-api',
}

export const lesseeEquipCount = {
    prefix: '/basics-api',
    url: "/lessee/list/equipCount",
    type: "get",
}
export const roleSlideshowList = {
    prefix: '/basics-api',
    url: "/roleSlideshow/list",
    type: "get",
}

export const lesseeInstallEquipCount = {
    prefix: '/basics-api',
    url: "/lessee/list/install/equipCount",
    type: "post",
}

export const sysUserReset = {
    prefix: '/basics-api',
    url: "/sysUser/data/reset",
    type: "post",
}


export const sysUserDataInspector = {
    url: '/sysUser/data/inspector',
    prefix: '/basics-api',
    type: "post",
}

export const lesseeDataListAll = {
    url: '/lessee/data/list/all',
    prefix: '/basics-api',
    type: "post",
}

export const enunList = {
    url: '/enun/list',
    type: 'get',
    prefix: '/basics-api',
}

export const administrativeRegionList = {
    url: '/administrativeRegion/list',
    type: 'get',
    prefix: '/basics-api',
}


export const equipmentDataScan = {
    url: '/equipment/data/scan/${rreq}',
    type: 'get',
    prefix: '/basics-api',
}

export const equipmentDataAdd = {
    url: '/equipment/data',
    type: 'post',
    prefix: '/basics-api',
    loading: '正在努力提交数据...',
    showMessage: true
}
export const equipmentInstallAdd = {
    url: '/equipment/data/install/add',
    type: 'post',
    prefix: '/basics-api',
    showMessage: true,
    loading: '正在努力提交数据...'
}

export const installDataAllList = {
    url: '/install/data/all/list',
    type: 'get',
    prefix: '/basics-api',
}

export const equipSystemDataList = {
    url: '/equipSystem/data/list',
    type: 'get',
    prefix: '/basics-api',
}

export const installDataAllAdd = {
    url: '/install/data/install/add',
    type: 'post',
    prefix: '/basics-api',
}

export const architectureAataListSearch = {
    url: '/architecture/data/list/search',
    type: 'get',
    prefix: '/basics-api',
}

export const messageSendPhone = {
    url: "/message/send/phone/${rreq}",
    type: "post",
    prefix: '/basics-api',
}

export const networkUnitDataListLessee = {
    url: '/networkUnit/data/list/lessee/${rreq}',
    type: 'get',
    prefix: '/basics-api',
}

export const fireControlKnowledgeDataPage = {
    url: "/fireControlKnowledge/data/page",
    type: 'get',
    prefix: '/basics-api',
}

