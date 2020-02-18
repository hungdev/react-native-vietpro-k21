import React from 'react';
import { Button, View, Text, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles'
import { Hr } from '../../components'
import { Metrics, Colors } from '../../themes';
import { getNewFeed } from '../../services/Api'
import momentTz from 'moment-timezone'
import momentDurationFormatSetup from 'moment-duration-format'
import moment from 'moment'

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

  async getNewFeed() {
    try {
      const result = await getNewFeed()
      console.log('ccccc', result)
      if (result.ok) {
        this.setState({ data: result.data.data })
      }

    } catch (error) {

    }
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      // data: [
      //   { id: 1, name: 'user admin', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
      //   { id: 2, name: 'user hello', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '28 days ago' },
      //   { id: 3, name: 'user ccc', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '25 days ago' },
      //   { id: 4, name: 'user aaa', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '24 days ago' },
      //   { id: 5, name: 'user ccss', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
      // ]
      data: []
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ moveProfile: this.onMoveToProfile });
    // this.props.navigation.setParams({ moveProfile: () => this.props.navigation.navigate('Profile') });

    this.getNewFeed()
  }

  onMoveToProfile = () => {
    this.props.navigation.navigate('Profile')
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
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold' }}
                onPress={() => this.props.navigation.navigate('Profile')}
              >
                admin
              </Text>
              <Text style={{ fontSize: 14, color: Colors.grey }}>{item.location}</Text>
            </View>
          </View>
          <View style={{ marginTop: Metrics.doubleBaseMargin }}>
            <Text>{item.content}</Text>
          </View>
        </View>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png' }}
          style={{ height: 200, width: 'auto', }} />
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: Metrics.doubleBaseMargin
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='like1' size={25} style={{ color: Colors.facebook, marginRight: 10 }} />
            <Text>{item.likes.length}</Text>
          </View>
          <Text>{diff}</Text>
        </View>
      </View >
    )
  }


  render() {
    const { value, data } = this.state
    return (
      <ScrollView>
        <View style={styles.homeContainer}>
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', padding: 20, }}>
              <Image
                source={{ uri: 'http://i.imgur.com/vGXYiYy.jpg' }}
                style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }} />
              <TextInput
                style={{ height: 40, width: '100%' }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder={`What's on your mind`}
              />
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
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item._id}
          // extraData={this.props}
          />

        </View >
      </ScrollView>
    );
  }
}
export default HomeScreen