import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Input, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './index.scss';

import * as AddressApi from './service'

class index extends Component {
  config = {
    navigationBarTitleText: '',
  };

  componentDidMount = () => {
    // Taro.showLoading({
    //   title: '加载中'
    // })
    // 持久化存储防止多次请求数据
    Taro.getStorage({
      key: 'cities'
    }).then((res)=> {
      console.log('resddd',res)
      if (res) {

      } else {
        this.getCities();
      }
    }).catch(()=> {
      this.getCities();
    })

  };

  getCities() {
    AddressApi.getDistricts({
      send_cities: 0
    }).then((res) => {
      console.log('res', res)
      if (res.status === 'ok') {
        Taro.setStorageSync('cities', res.data.send_cities.send_cities)
      }
    })
  }
  onColumnchange =(e)=> {

  }

  onChange = () => {

  }
  update = (event) => {
    const { value, id } = event.target;
    // this.props.dispatch({
    //   type: 'addressUpdate/save',
    //   payload: { [id]: value },
    // });
  }
  render() {
    const {addressList} = this.props
    return (
      <View className='addressUpdate-page'>
        <View className='head'>添加地址</View>
        <View className='form'>
          <Input
            placeholder='收件人'
            id='contact_name'
            value={'哈哈'}
            onInput={this.update}
          />
          <Input
            type='number'
            maxLength='11'
            placeholder='手机号码'
            id='contact_mobile'
            value={123455}
            onInput={this.update}
          />
          <Picker
            mode='multiSelector'
            className='picker'
            value={''}
            onChange={this.onChange}
            onColumnchange={this.onColumnchange}
          >

          </Picker>

          <Input
            placeholder='详细地址'
            id='address_detail'
            value={'beijing'}
            onInput={this.update}
          />
        </View>
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
