import * as React from 'react';
import { Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { signIn } from '../../services/Api'
import { connect } from 'react-redux';
import { setToken } from '../../actions/authAction'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: 'cee@c.com',
        password: '123456'
      }
    }
  }
  onChangeText(value, type) {
    const { data } = this.state
    this.setState({ data: { ...data, [type]: value } })
    // this.setState({
    //   data: {
    //     email: '',
    //     password: '',
    //     [type]: value
    //     // "email": value
    //   }
    // })
  }

  async onLogin() {
    const { data } = this.state
    try {
      const result = await signIn(data)
      if (result.ok) {
        const token = result.data.token
        this.props.dispatchSetToken(token)
        this.getMe()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getMe() {

  }

  render() {
    const { data } = this.state;
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
            marginTop: 30,
            paddingLeft: 10
          }}
          onChangeText={text => this.onChangeText(text, 'password')}
          value={data.password}
          placeholder='Your Password'
        />
        <TouchableOpacity
          style={{
            height: 60, width: '80%', marginTop: 30, justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => this.onLogin()}
        >
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
          <Text style={{ color: 'red' }}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >Sign Up</Text>
        </View>
      </View>
    );
  }
}

// lấy state từ store redux
function mapStateToProps(state) {
  return {
    // state: state từ store, 
    // authReducer: reducer được import trong index combineReducers
    // auth: lấy từ state trong authReducer
    token: state.auth.token
  }
}

// gửi action lên reducer
function mapDispatchToProps(dispatch) {
  return {
    // setToken là action
    dispatchSetToken: (token) => dispatch(setToken(token)),
    // dispatchDeletePerson: (person) => dispatch(removePerson(person))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)