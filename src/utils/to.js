export default function to (promise) {
  return promise.then((res) => {
    if (!res.data) {
      res.data = {}
    }
    return res
  }).catch(error => {
    console.log(`=============接口${error.config.url}异常=============`)
    return error
  })
}
// errorCaptured
