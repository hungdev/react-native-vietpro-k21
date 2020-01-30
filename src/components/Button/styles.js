import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../themes'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.facebook,
    justifyContent: 'center',
    borderRadius: 5,
    padding: Metrics.smallMargin
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center'
  }
})