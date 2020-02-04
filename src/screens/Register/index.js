import * as React from 'react';
import { Button, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { signUp } from '../../services/Api'
class Register extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      data: {
        email: '',
        userName: '',
        password: '',
        confirmPassword: ''
      }
    }
  }
  onChangeText(value, type) {
    const { data } = this.state
    // const data = this.state.data
    this.setState({
      data: {
        ...data, [type]: value
      }
    })
  }

  async onSignUp() {
    const { data, data: { password, email, confirmPassword, userName } } = this.state
    // const password = this.state.data.password
    if (!password || !email || !confirmPassword || !userName) {
      alert('some fields are empty')
      return
    }
    if (password !== confirmPassword) {
      alert('confirmPassword is not correct')
      return
    }
    try {
      const result = await signUp(data)
      if (result.ok) {
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { data } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/logo_color.png')}
            style={{ height: 100, width: 100, marginTop: '8%' }} />
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
            onChangeText={text => this.onChangeText(text, 'email')}
            value={data.email}
            placeholder='Your email'
          />
          <TextInput
            style={{
              height: 60,
              borderColor: '#ccc',
              borderWidth: 1,
              width: '80%',
              borderRadius: 5,
              marginTop: 10,
              paddingLeft: 10
            }}
            onChangeText={text => this.onChangeText(text, 'userName')}
            value={data.userName}
            placeholder='User name'
            onSubmitEditing={() => { this.lastNameRef.focus() }}
          />
          <TextInput
            style={{
              height: 60,
              borderColor: '#ccc',
              borderWidth: 1,
              width: '80%',
              borderRadius: 5,
              marginTop: 10,
              paddingLeft: 10
            }}
            onChangeText={text => this.onChangeText(text, 'password')}
            value={data.password}
            placeholder='Your password'
            secureTextEntry
          />
          <TextInput
            style={{
              height: 60,
              borderColor: '#ccc',
              borderWidth: 1,
              width: '80%',
              borderRadius: 5,
              marginTop: 10,
              paddingLeft: 10
            }}
            onChangeText={text => this.onChangeText(text, 'confirmPassword')}
            value={data.confirmPassword}
            placeholder='Confirm password'
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => this.onSignUp()}
            ref={ref => { this.btnSignUpRef = ref }}
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
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ marginRight: 10, color: 'grey' }}>No Account?</Text>
            <Text style={{ color: 'red' }}
              onPress={() => this.props.navigation.pop()}
            >Login Now</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Register