import Mock from 'mockjs'
// 把json数据引入   json数据是默认对外暴露的
import banner from './banner.json'
import floor from './floor.json'
import address from './adress.json'


Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/addres', { code: 200, data: address })