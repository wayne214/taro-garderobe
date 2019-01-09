import Request from '../../utils/request';

// 获取地址列表
export const getAddressList = data => Request({
  url: '/user/address',
  method: 'GET',
  data,
});
