import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CardView, Hr, Button } from '../../components';
import { Metrics, Colors } from '../../themes'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: [
        { id: 1, name: 'user admin', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
        { id: 2, name: 'user hello', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '28 days ago' },
        { id: 3, name: 'user ccc', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '25 days ago' },
        { id: 4, name: 'user aaa', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '24 days ago' },
        { id: 5, name: 'user ccss', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
        { id: 1, name: 'user admin', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
        { id: 2, name: 'user hello', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '28 days ago' },
        { id: 3, name: 'user ccc', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '25 days ago' },
        { id: 4, name: 'user aaa', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '24 days ago' },
        { id: 5, name: 'user ccss', email: 'admin@admin.com', content: 'hello', image: 'http://i.imgur.com/vGXYiYy.jpg', like: '1 like', date: '29 days ago' },
      ]
    }
  }

  renderHeader() {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Friend Requests</Text>
      </View>
    )
  }

  renderItem(item) {
    return (
      <View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'http://i.imgur.com/vGXYiYy.jpg' }}
              style={{ height: 80, width: 80, borderRadius: 40, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Metrics.baseMargin }}>
                <Button
                  text='Confirm'
                  style={{ width: 100 }}
                />
                <Button
                  text='Delete'
                  style={{ width: 100, backgroundColor: '#ccc' }}
                  textStyle={{ color: Colors.black }}
                />
              </View>
            </View>
          </View>
        </View>

      </View>
    )
  }
  render() {
    const { value, data } = this.state
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={() => this.renderHeader()}
        // extraData={this.props}
        />
      </View>
    );
  }
}
export default ProfileScreen