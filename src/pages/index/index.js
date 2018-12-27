import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAvatar,AtNoticebar,AtIcon, AtGrid } from 'taro-ui'
import GoodsList from '../../components/ProductList'


import './index.scss'

import counterSlice from '../../slices/counter';
import userSlice from '../../slices/user';
import shoppingcarSlice from '../../slices/shoppingcar';

import * as homeApi from './service'


class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state= {
      banner: [],
      brands: [],
      products_list: [],
      page: 1
    }
  }
  componentWillMount () { }

  componentDidMount () {
    homeApi.homepage({}).then((res)=> {
      // console.log('banner', res.data);
      // this.props.dispatch(addToCar(res.data))
      this.setState({
        banner: res.data.banner,
        brands: res.data.brands,
      })
    })

    homeApi.product({
      page: 1,
      mode: 1,
      type: 0,
      filter: 'sort:recomm|c:330602',}).then((res)=> {
      console.log('products', res.data);
        this.setState({
          products_list: res.data.rows
        })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goto =(id) =>{
    console.log('type', id);
    Taro.navigateTo({
      url: `/pages/details/detail?type=${id}`
    })
  }

  gotoShoppingCar = () => {
    Taro.navigateTo({
      url: '/pages/shoppingCar/shoppingCar'
    })
  }

  goSearchPage = () => {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }
  render () {
    const {banner, brands, products_list} = this.state
    return (
      <View className='todo'>
        {/*<View className='search-container'>*/}
          {/*<Text className='search-text' onClick={this.goSearchPage}>搜索</Text>*/}
          {/*<View className='search-line' onClick={this.goSearchPage} />*/}
          {/*<AtIcon value='shopping-bag' size='20' color='#696969' onClick={this.gotoShoppingCar} />*/}
        {/*</View>*/}
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplays
          style='width: 375px'
        >
          {
            banner.map((item)=>{
              return <SwiperItem key={item.id} style={{width:500}}>
                <Image mode='widthFix' src={item.image_src} className='swiper__item' />
              </SwiperItem>
            })
          }
        </Swiper>
        <ScrollView
          className='scrollview'
          scrollX='true'
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%; margin-top: 10px'
          lowerThreshold='20'
          upperThreshold='20'
          // onScrolltoupper={this.onScrolltoupper}
          // onScroll={this.onScroll}
        >
          {
            brands.map((item)=> {
              return <View key={item.id} className='header-icon-container' >
                <AtAvatar circle image={item.image_src} size='large' />
              </View>
            })
          }
        </ScrollView>

        <View className='recommend'>好物推荐</View>
        <GoodsList list={products_list} />
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    shoppingcarSlice: state.shoppingcarSlice
  }
}

const mapDispatchToProps = {
  addToCar: shoppingcarSlice.actions.addToCar
  };

export default connect(mapStateToProps, mapDispatchToProps)(Index)
