import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import './search.scss'

export default class search extends Component {
  config = {
    navigationBarTitleText: '发现'
  }

  constructor(props){
    super(props)
    this.state = {
      value: '',
    }
  }
  componentWillMount () {

  }

  componentDidMount () {
    console.log(this.$router.params)
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange = (value) => {
    console.log(value)
    this.setState({
      value
    })
  }

  goback = () =>{
    const pages = Taro.getCurrentPages();
    console.log(pages.length - 1);
    Taro.navigateBack({
      delta: pages.length - 1
    })

  }
  render () {
    return (
      <View className='index2'>
        <View className='search-container'>
          <AtInput
            name='value'
            title=''
            type='text'
            placeholder='请输入产品'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            className='search-input'
          />
          <AtIcon
            value='close'
            size='25'
            color='#696969'
            onClick={this.goback}
            className='close'
          />
        </View>
      </View>
    )
  }
}
