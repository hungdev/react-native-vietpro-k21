import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { CardView, Hr, Button } from '../../components';
import { Metrics, Colors } from '../../themes'
import { connect } from 'react-redux';
import styles from './styles'
import { getImageUrl } from '../../utils'
import imagePicker from '../../components/ImagePicker'
import { createPost } from '../../services/Api'

class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => {
        return (
          <View style={styles.warpHeader}>
            <TouchableOpacity onPress={navigation.getParam('onPost')} >
              <Text style={styles.txtPost}>Post</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      data: {
        content: '',
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPost: this.onPost });
  }

  onPost = async () => {
    const { data, imageRs } = this.state
    let formData = new FormData()
    formData.append('title', 'hello')
    formData.append('content', data.content)
    formData.append('location', 'Ha noi')
    formData.append('imageUrl',
      {
        uri: imageRs.uri,
        type: imageRs.type,
        name: imageRs.fileName,
      }
    )
    try {
      const result = await createPost(formData)
      this.props.navigation.navigate('Home')
      console.log('result', result)
    } catch (error) {

    }
  }

  onUpload() {
    const { data } = this.state
    imagePicker((uri, fileName, type) => {
      this.setState({ imageRs: { uri, fileName, type } })
    })

  }
  onChangeText(text) {
    const { data } = this.state
    this.setState({
      data: { ...data, content: text }
    })
  }

  render() {
    const { data, imageRs } = this.state
    const { user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: getImageUrl(user && user.avatar_url) }}
              style={{ height: 60, width: 60, borderRadius: 30, marginRight: 10 }} />
            <View >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user && user.user_name}</Text>
            </View>
          </View>
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, textAlignVertical: 'top', fontSize: 18 }}
          onChangeText={text => this.onChangeText(text)}
          value={data.content}
          placeholder={`What's on your mind?`}
        />
        {imageRs && <Image
          source={{ uri: imageRs.uri }}
          resizeMode='cover'
          style={{ height: 100, width: '100%' }} />}
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.onUpload()}>
            <Text>Add your post</Text>
            <MaterialIcons name="photo-camera" size={20} color={Colors.facebook} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.me
  }
}

// gửi action lên reducer
function mapDispatchToProps(dispatch) {
  return {
    // dispatchSetToken: (token) => dispatch(setToken(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)