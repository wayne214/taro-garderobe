import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

export default class AddressList extends Component {
  config = {
    navigationBarTitleText: '收货地址',
  };

  componentDidMount = () => {

  };
  addressUpdate = () => {

  }
  render() {
    return (
      <View className='addressList-page'>
        <View className='add' onClick={this.addressUpdate}>
          <Image mode='widthFix' src={require('../../images/icon/add.png')} />
          <Text>添加地址</Text>
        </View>
      </View>
    )
  }
}
