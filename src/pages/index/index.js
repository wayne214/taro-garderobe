import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'

import counterSlice from '../../slices/counter';
import userSlice from '../../slices/user';

class Index extends Component {

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
    const {add, minus} = this.props;
    return (
      <View className='todo'>
        <Text>Hello world! dragosoft</Text>
        <Button className='add_btn' onClick={add}>+</Button>
        <Button className='dec_btn' onClick={minus}>-</Button>
        <Text>{this.props.counter}</Text>
        <Button onClick={this.goto}>走你</Button>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = {
    add: counterSlice.actions.increment,
    minus: counterSlice.actions.decrement
  };

export default connect(mapStateToProps, mapDispatchToProps)(Index)
