import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function imagePicker(callBack) {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log('source', source)
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // this.setState({
      //   imageSource: source,
      // });
      callBack({ source, base64: 'data:image/jpeg;base64,' + response.data })
    }
  });
}

export default imagePicker