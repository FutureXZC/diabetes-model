export function saveExam(formData) {
    return fetch('http://127.0.0.1:3000/process/saveExam', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.text() })
}

export function analysis(formData) {
    return fetch('http://127.0.0.1:3000/process/analysis', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => { return res.text() })
}