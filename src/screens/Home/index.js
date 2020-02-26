import React from 'react';
import { Button, View, Text, TouchableOpacity, Image, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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

momentDurationFormatSetup(momentTz)

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // header: null,
      headerRight: () => {
        return (
          <View style={styles.warpHeader}>
            <Feather name='search' size={30} style={styles.userIcon} />
            <TouchableOpacity onPress={navigation.getParam('moveProfile')} >
              <EvilIcons
                name='user' size={38} style={styles.userIcon}
              />
            </TouchableOpacity>
          </View>
        )
      }
    }
  };


  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: [],
      isVisible: false,
      limit: 5,
      skip: 0,
      error: null,
      refreshing: false,
      canLoadMore: false
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ moveProfile: this.onMoveToProfile });
    // this.props.navigation.setParams({ moveProfile: () => this.props.navigation.navigate('Profile') });

    this.getNewFeed()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getNewFeed()
    }
  }

  onMoveToProfile = () => {
    this.props.navigation.navigate('Profile')
  }

  async onPostDelete() {
    const { postId } = this.state
    try {
      const result = await deletePost({ ids: [postId] })
      this.setState({ isVisible: false })
      this.getNewFeed()
    } catch (error) {

    }
  }

  async onLike(item) {
    const { user } = this.props
    try {
      const result = await updatePost({
        postId: item._id,
        like: user._id
      })
      console.log('result', result)
      this.setState({ isVisible: false })
      this.getNewFeed()
    } catch (error) {

    }
  }

  handleLoadMore = () => {
    if (this.state.canLoadMore) {
      // alert('ok')
      this.setState({ skip: this.state.skip + 5, canLoadMore: false },
        () => {
          this.getNewFeed();
        }
      );
    }
  };

  async getNewFeed() {
    const { limit, skip } = this.state
    try {
      this.setState({ loading: true });
      const result = await getNewFeed({ limit, skip })
      if (result.ok) {
        this.setState({
          data: [...this.state.data, ...result.data.data],
          loading: false,
        })
      }

    } catch (error) {

    }
  }

  renderItem(item) {
    const diff = moment().diff(moment(item.created_date), 'days');
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
            onPress={() => this.onLike(item)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='like1' size={25} style={{ color: Colors.facebook, marginRight: 10 }} />
            <Text>{item.likes.length}</Text>
          </TouchableOpacity>
          <Text>{diff}</Text>
        </View>
      </View >
    )
  }

  renderHeader() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', padding: 20, }}>
          <Image
            source={{ uri: 'http://i.imgur.com/vGXYiYy.jpg' }}
            style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
          <Text
            style={{ height: 40, width: '100%', textAlignVertical: 'center' }}
            onPress={text => this.props.navigation.navigate('Post')}
          >
            {`What's on your mind`}
          </Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.divider,
          paddingVertical: 10
        }}>
          <AntDesign name='camera' size={38} style={{ color: Colors.facebook, marginRight: 10 }} />
          <Text>Photo</Text>
        </View>
      </View>
    )
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  render() {
    const { value, data } = this.state
    return (
      <View>

        <FlatList
          data={data}
          renderItem={({ item }) => this.renderItem(item)}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={this.renderFooter}
          keyExtractor={item => item._id}
          // extraData={this.props}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => this.setState({ canLoadMore: true })}
        />

        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.onPostDelete()}>
              <Text style={styles.contentTitle}>Delete</Text>
            </TouchableOpacity>
            <Text style={styles.contentTitle}>Do something</Text>
          </View>
        </Modal>

      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    user: state.auth.me
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatchSetToken: (token) => dispatch(setToken(token)),
    // dispatchSetMe: (user) => dispatch(setMe(user)),
    // // dispatchDeletePerson: (person) => dispatch(removePerson(person))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(HomeScreen))