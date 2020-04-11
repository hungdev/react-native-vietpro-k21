import React from 'react';
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
import Item from './Item'

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
      skip: 0,
      limit: 5,
      loading: false
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

  handleLoadMore = () => {
    if (this.state.canLoadMore) {
      this.setState({ skip: this.state.skip + 5, canLoadMore: false },
        () => {
          this.getNewFeed();
        }
      );
    }
  };

  async getNewFeed() {
    const { skip, limit, data } = this.state
    this.setState({ loading: true })
    try {
      const result = await getNewFeed({ skip, limit })
      if (result.ok) {
        this.setState({
          data: [...data, ...result.data.data],
          loading: false
        })
      }

    } catch (error) {

    }
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

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }


  render() {
    const { value, data } = this.state
    console.log('data', data)
    return (
      <View style={styles.homeContainer}>

        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} user={this.props.user} />}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
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

      </View >
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    user: state.auth.me
  }
}

// gửi action lên reducer
function mapDispatchToProps(dispatch) {
  return {
    // // setToken là action
    // dispatchSetToken: (token) => dispatch(setToken(token)),
    // dispatchSetMe: (user) => dispatch(setMe(user)),
    // // dispatchDeletePerson: (person) => dispatch(removePerson(person))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(HomeScreen))