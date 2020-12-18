import request from '../utils/request'
import qs from 'qs'

export function changePassword(data) {
    return request({
      url: '/webapi/datacenter/core/employee/change/user/password',
      method: 'post',
      data:qs.stringify(data)
    })
  }