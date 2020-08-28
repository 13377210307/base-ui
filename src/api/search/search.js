import request from '@/utils/request'

// 精准查询
export function search (keyWord) {
  return request({
    url: '/search/search/accurate/'+keyWord,
    method: 'get'
  })
}


// 高亮查询
export function searchHighLight (keyWord) {
  return request({
    url: '/search/search/highLight/'+keyWord,
    method: 'get'
  })
}

