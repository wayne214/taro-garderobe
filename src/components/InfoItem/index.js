import Taro, { Component } from '@tarojs/taro';
import { View, Image, Icon } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtIcon } from 'taro-ui'
import './index.scss';


export default class InfoItem extends Component {

  render() {
    const { onClick, content, iconUrl, url } = this.props;
    return (
      <View className='infoItem-page' data-url={url} onClick={onClick} >
        <View className='icon'>
          <Image src={iconUrl} mode='widthFix' />
        </View>

        <View className='content'>{content}</View>

        <View className='arrow'>
          <AtIcon value='chevron-right' size='20' color='#666666' />
        </View>
      </View>
    )
  }
}
