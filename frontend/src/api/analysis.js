import request from '@/utils/request'

export function analysis(formData) {
  return request({
    url: 'http://127.0.0.1:3000/process/analysis',
    method: 'post',
    formData
  })
}