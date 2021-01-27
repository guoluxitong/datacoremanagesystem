import request from '../../../../../utils/request'

export function getOnlineRecordList(query) {
    return request({
        url: '/wechat/onlineRecord/tracking',
        method: 'get',
        params: query
    })
}

export function getOnlineHistoryDetailList(openId) {
    return request({
        url: '/wechat/onlineRecord/find/openId',
        method: 'get',
        params:{openId}
    })
}
export function getuserDeviceHistorylList(openId) {
    return request({
        url: '/wechat/userAddDeviceHistory/find/openId',
        method: 'get',
        params:{openId}
    })
}
export function getuserDeviceDeatailList(deviceNo,openId) {
    return request({
        url: '/wechat/DeviceOnlineRecord/find/deviceNo/openId',
        method: 'get',
        params:{deviceNo,openId}
    })
}