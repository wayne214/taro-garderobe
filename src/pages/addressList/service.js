import Request from '../../utils/request';

// 获取商品详情
export const getAddressList = data => Request({
  url: '/user/address',
  method: 'GET',
  data,
});
