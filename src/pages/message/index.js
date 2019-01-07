import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

export default class Message extends Component {
  config = {
    navigationBarTitleText: '消息',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="message-page">
        <Image mode="widthFix" src="http://static-r.msparis.com/uploads/8/a/8af1e11caa2c7dc29894777852d50eb3.png" />
      </View>
    )
  }
}
