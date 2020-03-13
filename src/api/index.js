import requestOfPost from '@/request/common.js'
export function axiosPost (url, data) {
  if (!data) {
    data = {}
  }
  return new Promise((resolve, reject) => {
    requestOfPost(url, data).then(res => resolve(res)).catch(error => reject(error))
  })
}
