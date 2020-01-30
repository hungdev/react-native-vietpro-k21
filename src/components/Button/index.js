import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

export default class FullButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}