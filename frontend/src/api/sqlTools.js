export function getList() {
    return fetch('http://127.0.0.1:3000/sql/getList', {
          method: 'post',
        }).then(res => { return res.json() })
}

export function getExam(data) {
    return fetch('http://127.0.0.1:3000/sql/getExam', {
          method: 'post',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.json() })
}

export function deleteHis(data) {
    return fetch('http://127.0.0.1:3000/sql/deleteHis', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => { return res.json() })
}