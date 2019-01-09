import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './index.scss';

import * as AddressApi from './service'

class index extends Component {
  config = {
    navigationBarTitleText: '收货地址',
  };

  componentDidMount = () => {
    Taro.showLoading({
      title: '加载中'
    })
    AddressApi.getAddressList({
      access_token: this.props.access_token
    }).then((res)=> {
      console.log('res', res)
      Taro.hideLoading()
      this.props.dispatch({
        type: 'user/saveAddressList',
        payload: {
          addressList: res.data.rows
        }
      })
    })
  };
  // 添加地址
  addressUpdate = () => {
    Taro.navigateTo({
      url: '/pages/addressUpdate/index'
    })
  }
  // 编辑地址
  addressEdit = () => {
    Taro.navigateTo({
      url: '/pages/addressUpdate/index'
    })
  }
  render() {
    const {addressList} = this.props
    return (
      <View className='addressList-page'>
        {
          addressList.length > 0 ? (
            addressList.map((item) => (
              <View className='content' key={item.id}>
                <View className='info'>
                  <View className='contact'>
                    <Text className='name'>{item.contact_name}</Text>
                    <Text className='mobile'>{item.contact_mobile}</Text>
                  </View>
                  <View className='region'>
                    <View className='name'>{item.region_name}</View>
                    <View className='detail'>{item.address_detail}</View>
                  </View>
                </View>
                {/*<View*/}
                  {/*className='edit'*/}
                  {/*data-id={item.id}*/}
                  {/*data-region_code={item.region_code}*/}
                  {/*data-region_name={item.region_name}*/}
                  {/*data-contact_name={item.contact_name}*/}
                  {/*data-contact_mobile={item.contact_mobile}*/}
                  {/*data-address_detail={item.address_detail}*/}
                  {/*onClick={this.addressEdit}*/}
                {/*>*/}
                  {/*<Image mode='widthFix' src='http://static-r.msparis.com/uploads/9/1/91d94589817e388f6c2d641f34d99b2f.png' />*/}
                {/*</View>*/}
              </View>
            ))
          ) : (
            <View className='empty-address'>
              <Image mode='widthFix' src='https://static-rs.msparis.com/m-site/images/empty/address.png' />
            </View>
          )
        }

        {/*<View className='add' onClick={this.addressUpdate}>*/}
          {/*<Image mode='widthFix' src={require('../../images/icon/add.png')} />*/}
          {/*<Text>添加地址</Text>*/}
        {/*</View>*/}
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    access_token: state.user.access_token,
    addressList: state.user.addressList,
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
