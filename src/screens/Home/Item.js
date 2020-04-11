import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles'
import { Hr } from '../../components'
import { Metrics, Colors } from '../../themes';
import { getNewFeed, deletePost, updatePost } from '../../services/Api'
import momentTz from 'moment-timezone'
import momentDurationFormatSetup from 'moment-duration-format'
import moment from 'moment'
import { getImageUrl } from '../../utils'
import Modal from "react-native-modal";
import _ from 'lodash'

export class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: [],
      isVisible: false,
      skip: 0,
      limit: 5,
      loading: false,

      item: props.item
    }
  }



  async onLike() {
    const { user } = this.props
    const { item } = this.state
    const cloneItemState = { ...item }
    const checkIncludeLike = cloneItemState.likes.includes(user._id)
    const newArrLike = checkIncludeLike ? cloneItemState.likes.filter(e => e !== user._id) : cloneItemState.likes.concat([user._id])
    try {
      const result = await updatePost({
        postId: item._id,
        like: user._id
      })
      console.log('result', result)
      this.setState({
        isVisible: false,
        item: { ...item, likes: newArrLike }
      })
    } catch (error) {

    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.item), nextProps.item) {
      return true
    }
    return false;
  }




  render() {
    const { item } = this.state
    console.log('item', item)
    return (
      <View style={{ marginTop: 10, borderWidth: 1, backgroundColor: 'white' }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: 'http://i.imgur.com/vGXYiYy.jpg' }}
              style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                  onPress={() => this.props.navigation.navigate('Profile')}
                >
                  {item && item.user_id && item.user_id.user_name}
                </Text>
                <Text style={{ fontSize: 14, color: Colors.grey }}>{item.location}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ isVisible: true, postId: item._id })}
              >
                <Feather name='more-vertical' size={20} style={{}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: Metrics.doubleBaseMargin }}>
            <Text>{item.content}</Text>
          </View>
        </View>
        {item && item.image_url ? <Image
          source={{ uri: getImageUrl(item.image_url) }}
          resizeMode='cover'
          style={{ height: 400, width: 'auto', }} /> : null}
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: Metrics.doubleBaseMargin
        }}>
          <TouchableOpacity
            onPress={() => this.onLike()}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='like1' size={25} style={{ color: Colors.facebook, marginRight: 10 }} />
            <Text>{item.likes.length}</Text>
          </TouchableOpacity>
          <Text>{'diff'}</Text>
        </View>
      </View >
    )
  }
}

export default Item
