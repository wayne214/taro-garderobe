import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'


class index extends Component {
  config = {
    navigationBarTitleText: '订单'
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  componentDidMount () {

  }
  handleClick = (value) => {
    this.setState({
      current: value
    })
  }
  render () {
    const {list} = this.props;
    return (
      <View className='order-page'>
        <AtTabs
          scroll
          current={this.state.current}
          tabList={list}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0} >
            <View style='padding: 200px 50px;background-color: #FAFBFC;text-align: center;'>暂无数据</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 200px 50px;background-color: #FAFBFC;text-align: center;'>暂无数据</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 200px 50px;background-color: #FAFBFC;text-align: center;'>暂无数据</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='padding: 200px 50px;background-color: #FAFBFC;text-align: center;'>暂无数据</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style='padding: 200px 50px;background-color: #FAFBFC;text-align: center;'>暂无数据</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    list: state.user.list
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
