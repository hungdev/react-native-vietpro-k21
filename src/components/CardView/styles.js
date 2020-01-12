import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../themes'

export default StyleSheet.create({
  container: {
    // margin: Metrics.smallMargin,
    // borderColor: Colors.border,
    borderRadius: 7,
    borderBottomWidth: 0.5,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.card,
    borderColor: Colors.transparent,
    // marginBottom: Metrics.smallMargin
    borderWidth: 1
  }
})