import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import './index.scss'

import * as Actions from '../../actions/counter'

//
// function mapStateToProps(state) {
//   return {
//     counter: state.counter.toJS()
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     ...bindActionCreators(Actions, dispatch)
//   }
// }
// @connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goto = () => {
    Taro.navigateTo({
      url: '/pages/index2/index?sd=1'
    })
  }
  render () {
    const {add, minus, asyncAdd} = this.props;
    return (
      <View className='todo'>
        <Text>Hello world! dragosoft</Text>
        <Button className='add_btn' onClick={add}>+</Button>
        <Button className='dec_btn' onClick={minus}>-</Button>
        <Button className='dec_btn' onClick={asyncAdd}>async</Button>
        {/*<Text>{this.props.counter.num}</Text>*/}
        <Button onClick={this.goto}>走你</Button>
      </View>
    )
  }
}
