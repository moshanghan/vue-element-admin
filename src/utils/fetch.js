import service from './request'
export default {
  /**
   * 基础post,get请求接口。
   * post请求数据分为:
   * 1.添加到请求体（ body） postData
   * 2.添加到url的请求字符串中的 post
   * @param  {string} url 请求的接口
   * @param  {json} reqData  post 类型传递的数据
   */
  // url
  post(questUrl, questData) {
    return new Promise(function(resolve, reject) {
      return service({
        method: 'POST',
        url: questUrl,
        params: questData
      }).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // body
  postData(questUrl, questData) {
    return new Promise(function(resolve, reject) {
      return service({
        method: 'POST',
        url: questUrl,
        data: questData
      }).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  get(questUrl, questData) {
    return new Promise(function(resolve, reject) {
      return service({
        method: 'GET',
        url: questUrl,
        params: questData
      }).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
