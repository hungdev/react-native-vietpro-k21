import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { CardView, Hr, Button } from '../../components';
import { Metrics, Colors } from '../../themes'

class PostScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  render() {
    const { value } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'http://i.imgur.com/vGXYiYy.jpg' }}
              style={{ height: 60, width: 60, borderRadius: 30, marginRight: 10 }} />
            <View >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>cccc</Text>
            </View>
          </View>
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, textAlignVertical: 'top', fontSize: 18 }}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder={`What's on your mind?`}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text>Add your post</Text>
            <MaterialIcons name="photo-camera" size={20} color={Colors.facebook} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default PostScreen