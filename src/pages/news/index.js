import Taro, { Component } from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';
import './index.scss';

export default class index extends Component {

  constructor(props) {
    super(props)
    const  url = this.$router.params.id
    console.log('id',url);
    this.state = {
      url
    }
  }

  componentDidMount = () => {
    // const  id = this.$router.params.id
    // console.log('id',id);
  };

  render() {
    return (
      <View className='news-page'>
        <WebView src={this.state.url} />
      </View>
    )
  }
}
