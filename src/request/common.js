import $service from './service'
export default function requestOfPost (url, data) {
  return $service.post(url, data)
}
