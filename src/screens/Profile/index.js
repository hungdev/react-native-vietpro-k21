import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CardView, Hr } from '../../components';
import { Metrics, Colors } from '../../themes'
import { logout } from '../../actions/authAction'
import imagePicker from '../../components/ImagePicker'
import ImagePicker from 'react-native-image-picker';
import { updateUser } from '../../services/Api'

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        content: '',
      }
    }
  }
  onLogout() {
    this.props.dispatchLogout()
    this.props.navigation.navigate('SignIn')
  }

  onChangeAvatar() {
    // imagePicker((uri, fileName, type) => {
    //   this.setState({ imageRs: { uri, fileName, type } })
    // })
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          imageRs: { uri: response.uri, fileName: response.fileName, type: response.type },
        });
        this.updateProfile({ uri: response.uri, name: response.fileName, type: response.type })
      }
    });
  }

  async updateProfile(avatarUrl) {
    let formData = new FormData()
    formData.append('avatarUrl', avatarUrl)
    try {
      const result = await updateUser(formData)
      console.log('result', result)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { imageRs } = this.state
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <View style={{ marginTop: '5%' }}>
            <Image
              source={{ uri: (imageRs && imageRs.uri) || 'https://randomuser.me/api/portraits/women/34.jpg' }}
              style={{ height: 150, width: 150, borderWidth: 1, borderRadius: 80 }}
              resizeMode='cover'
            />
            <View style={{ position: 'absolute', bottom: 8, right: 0 }}>
              <TouchableOpacity
                onPress={() => this.onChangeAvatar()}
                style={{
                  borderWidth: 1,
                  backgroundColor: '#0077FF', borderRadius: 23, height: 45, width: 45,
                  justifyContent: 'center', alignItems: 'center', borderColor: '#fff'
                }}>
                <MaterialIcons name="add-a-photo" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <CardView style={{ width: '90%', paddingHorizontal: 20, marginTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <FontAwesome name="envelope-o" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Become a member</Text>
            </View>
            <Hr lineHeight={1}
              marginLeft={Metrics.smallMargin}
              marginRight={Metrics.smallMargin}
              lineColor={Colors.divider}
              marginTop={Metrics.baseMargin}
              marginBottom={Metrics.baseMargin} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <MaterialIcons name="help-outline" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Help</Text>
            </View>
            <Hr lineHeight={1}
              marginLeft={Metrics.smallMargin}
              marginRight={Metrics.smallMargin}
              lineColor={Colors.divider}
              marginTop={Metrics.baseMargin}
              marginBottom={Metrics.baseMargin} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <AntDesign name="customerservice" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Terms of service</Text>
            </View>
            <Hr lineHeight={1}
              marginLeft={Metrics.smallMargin}
              marginRight={Metrics.smallMargin}
              lineColor={Colors.divider}
              marginTop={Metrics.baseMargin}
              marginBottom={Metrics.baseMargin} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <MaterialIcons name="security" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Private policy</Text>
            </View>
          </CardView>

          <CardView style={{ width: '90%', paddingHorizontal: 20, marginTop: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <FontAwesome name="gears" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Settings</Text>
            </View>
            <Hr lineHeight={1}
              marginLeft={Metrics.smallMargin}
              marginRight={Metrics.smallMargin}
              lineColor={Colors.divider}
              marginTop={Metrics.baseMargin}
              marginBottom={Metrics.baseMargin} />
            <TouchableOpacity
              onPress={() => this.onLogout()}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <FontAwesome5 name="sign-out-alt" style={{ marginRight: 15 }} size={16} color="#bbb" />
              <Text>Logout</Text>
            </TouchableOpacity>
          </CardView>
        </View >
      </ScrollView>
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
    dispatchLogout: (person) => dispatch(logout(person))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)