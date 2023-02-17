import { v4 as uuidv4 } from 'uuid'

export const getuuid = () => {
  // 从本地获取一下，查看有没有uuid
  let uuid = localStorage.getItem('uuid')
  // 如果没有uuid，就生成一个
  if (!uuid) {
    uuid = uuidv4()
    // 存储到本地存储里面
    localStorage.setItem('uuid', uuid)
  }
  return uuid
}