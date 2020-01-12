import * as React from 'react';
import { Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }
  onChangeText(value) {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={require('../../assets/logo_color.png')}
          style={{ height: 100, width: 100, marginTop: '20%' }} />
        <TextInput
          style={{
            height: 60,
            borderColor: '#ccc',
            borderWidth: 1,
            width: '80%',
            borderRadius: 5,
            marginTop: 50,
            paddingLeft: 10
          }}
          onChangeText={text => this.onChangeText(text)}
          value={value}
          placeholder='Your email'
        />
        <TextInput
          style={{
            height: 60,
            borderColor: '#ccc',
            borderWidth: 1,
            width: '80%',
            borderRadius: 5,
            marginTop: 30,
            paddingLeft: 10
          }}
          onChangeText={text => this.onChangeText(text)}
          value={value}
          placeholder='Your Password'
        />
        <TouchableOpacity
          style={{
            height: 60, width: '80%', marginTop: 30, justifyContent: 'center', alignItems: 'center'
          }}>
          <Image
            source={require('../../assets/button_block.png')}
            style={{ height: 60, width: '100%', }} />
          <View style={{ position: 'absolute' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Login
              </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ marginRight: 10, color: 'grey' }}>No Account?</Text>
          <Text style={{ color: 'red' }}>Sign Up</Text>
        </View>
      </View>
    );
  }
}
export default HomeScreen