import { StyleSheet } from 'react-native'
// import { Fonts, Metrics, Colors } from '../../themes'

export default StyleSheet.create({
  warpHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userIcon: {
    marginRight: 10,
    color: '#fff'
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'grey'
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})