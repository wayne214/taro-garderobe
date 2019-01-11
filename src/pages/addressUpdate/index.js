import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Input, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
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
      // console.log('resddd',res)
      if (res) {
        this.props.dispatch({
          type: 'address/getDistricts',
          payload: {
            address: res,
          }
        })
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
    console.log('e',e);
    const {column, value} = e.detail;
    const {cities, districts}  = this.props;
    const arr = JSON.parse(JSON.stringify(districts));

    if (column === 0) {

      arr[1] = []
      arr[2] = []
      cities[value].cities.forEach(item =>{
        arr[1].push({
          key: item.key,
          name: item.name
        })
      })
      cities[value].cities[0].regions.forEach(item => {
        arr[2].push({
          key: item.key,
          name: item.name,
        })
      });

      this.props.dispatch({
        type: 'address/currentIndex',
        payload: {
          currentIndex: value
        }
      })
    }

    if (column === 1) {
      const{currentIndex} = this.props;
      arr[2] = []
      cities[currentIndex].cities[value].regions.forEach(item => {
        arr[2].push({
          key: item.key,
          name: item.name
        })
      })
    }

    this.props.dispatch({
      type: 'address/updateDistricts',
      payload: {
        districts: arr,
      },
    })

  }

  onChange = (e) => {
    const { value } = e.detail;
    const { cities } = this.props;
    const detail = cities[value[0]].cities[value[1]].regions[value[2]];
    this.props.dispatch({
      type: 'address/savePickValue',
      payload: {
        pickerValue: value,
        showValue: {
          region_code: detail.key,
          region_name: detail.fullname,
        }
      }
    })
  }
  update = (event) => {
    const { value, id } = event.target;
    console.log('input-event', event.target)
    this.props.dispatch({
      type: 'address/saveInput',
      payload: { [id]: value },
    });
  }

  submit = () => {
    const { showValue, contact_name, contact_mobile, address_detail, access_token } = this.props;
    console.log('address_detail',address_detail)
    if (contact_name === '') {
      Taro.showToast({
        title: '请输入收货人',
        icon: 'none',
      })
      return
    }

    if (!/^1[234578]\d{9}$/.test(contact_mobile)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      });
      return;
    }
    if (showValue.region_name === '') {
      Taro.showToast({
        title: '请选择收货地址',
        icon: 'none',
      });
      return;
    }
    if (address_detail === '') {
      Taro.showToast({
        title: '请输入详细地址',
        icon: 'none',
      });
      return;
    }

    AddressApi.updateAddress({
      access_token,
      id: '',
      region_code: showValue.region_code,
      region_name: showValue.region_name,
      contact_name,
      contact_mobile,
      address_detail
    }).then(res => {
      console.log(res);
    })
  }
  render() {
    const { addressId, districts, pickerValue, showValue, contact_name, contact_mobile, address_detail } = this.props;

    return (
      <View className='addressUpdate-page'>
        <View className='head'>添加地址</View>
        <View className='form'>
          <Input
            placeholder='收件人'
            id='contact_name'
            value={contact_name}
            onInput={this.update}
          />
          <Input
            type='number'
            maxLength='11'
            placeholder='手机号码'
            id='contact_mobile'
            value={contact_mobile}
            onInput={this.update}
          />
          <Picker
            rangeKey='name'
            range={districts}
            mode='multiSelector'
            className='picker'
            value={pickerValue}
            onChange={this.onChange}
            onColumnchange={this.onColumnchange}
          >
            {
              showValue.region_name == '' ? (
                <View className='label'>
                  省、市、区
                  <AtIcon value='chevron-right' size='20' color='#666666' />
                </View>
              ) : (
                <View className='picker-item'>
                  {showValue.region_name}
                  <AtIcon value='chevron-right' size='20' color='#666666' />
                </View>
              )
            }
          </Picker>

          <Input
            placeholder='详细地址'
            id='address_detail'
            value={address_detail}
            onInput={this.update}
          />
        </View>

        <View className='bottom-btn'>
          {addressId && addressId !== '' && (
            <View className='confirm remove' onClick={this.delete}>
              <Image mode='widthFix' src={require('../../images/icon/times.png')} />
              <Text>删除</Text>
            </View>
          )}
          <View className='confirm' onClick={this.submit}>
            <Image mode='widthFix' src={require('../../images/icon/check.png')} />
            <Text>保存</Text>
          </View>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    addressId: state.address.addressId,
    cities: state.address.cities,
    districts: state.address.districts,
    pickerValue: state.address.pickerValue,
    showValue: state.address.showValue,
    contact_name: state.address.contact_name,
    contact_mobile: state.address.contact_mobile,
    address_detail: state.address.address_detail,
    currentIndex: state.address.currentIndex,
    access_token: state.user.access_token,
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
