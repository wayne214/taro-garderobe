import Taro, { Component } from '@tarojs/taro';
import { View, Image, Icon } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtIcon } from 'taro-ui'
import './index.scss';


export default class MySwiper extends Component {
  static propTypes = {
    banner: PropTypes.array,
    home: PropTypes.bool,
  };

  static defaultProps = {
    banner: [],
    home: false
  };

  render() {
    const { clothing, onDeleteClothing } = this.props;
    return (
      <View className='clothingsItem-page' >
        <View className='WhiteSpace' />
        <View className='hr' />
        {
          clothing.map((item)=>(
            <View key={item.product_id}>
              <View className='WhiteSpace' />
              <View className='clothing'>
                <View className='shop-image'>
                  <Image mode='widthFix' src={item.images} />
                </View>

                <View className='content'>
                  <View className='title'>{item.brand}</View>
                  <View className='info'>{item.name}</View>
                  <View className='size'>
                    {`${item.spu} | ${item.specification || '均码'}`}
                  </View>
                </View>

                <View className='edit' data-id={item.product_id} onClick={onDeleteClothing}>
                  <AtIcon value='trash' color='#ccc' />
                </View>
              </View>

              <View className='WhiteSpace' />
              <View className='hr' />
            </View>
          ))
        }
      </View>
    )
  }
}
