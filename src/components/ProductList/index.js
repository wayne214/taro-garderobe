import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss';

export default class Index extends Component {
  static propTypes = {
    list: PropTypes.array,
  }

  static defaultProps = {
    list: []
  }
  // 跳转详情页
  gotoDetail = (e) => {
    Taro.navigateTo({
      url: `/pages/details/detail?id=${e.currentTarget.dataset.id}`,
    })
  }

  render () {
    const {list} = this.props;
    return (
      <View className='goods-list-container'>
        {
          list.length > 0 && (<View className='goods-ul'>
            {
              list.map((item)=>{
                return <View key={item.id} className='goods-li' data-id={item.id} onClick={this.gotoDetail}>
                  <View className='pos'>
                    <Image className='item-image' src={item.cover_image ? `${item.cover_image}` : 'http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png'} alt="" />
                  </View>

                  <View className='zan-capsule'>
                    {item.type_id == 2 && item.mode_id == 1 && <View className='zan-capsule__left'>VIP</View>}
                    {item.limit_tag && item.limit_tag != '' && <View className='zan-capsule__center'>{item.limit_tag}</View>}
                    {item.market_price / 100 > 500 && (
                      <View className='zan-capsule__right'>
                        参考价¥
                        {item.market_price / 100}
                      </View>
                    )}
                  </View>

                  <Text className='dark'>{item.brand}</Text>
                  <Text>{item.name}</Text>
                </View>
              })
            }
          </View>)
        }
      </View>
    )
  }
}
