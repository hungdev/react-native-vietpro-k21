import React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';

class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen hihi</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
          <Text>Move to Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default HomeScreen