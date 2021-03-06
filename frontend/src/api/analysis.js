import request from '@/utils/request'


export function analysisDesc(formData) {
  return request({
    url: 'http://127.0.0.1:3000/process/analysisDesc',
    method: 'post',
    params: formData,
  })
}

export function analysisExam(formData) {
  return request({
    url: 'http://127.0.0.1:3000/process/analysisExam',
    method: 'post',
    params: formData,
  })
}

export function analysisDouble(formData) {
  return request({
    url: 'http://127.0.0.1:3000/process/analysisDouble',
    method: 'post',
    params: formData,
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}