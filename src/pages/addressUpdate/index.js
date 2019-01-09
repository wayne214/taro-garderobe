import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './index.scss';

import * as AddressApi from './service'

class index extends Component {
  config = {
    navigationBarTitleText: '编辑地址',
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
  addressUpdate = () => {

  }
  render() {
    const {addressList} = this.props
    return (
      <View className='addressList-page'>

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
