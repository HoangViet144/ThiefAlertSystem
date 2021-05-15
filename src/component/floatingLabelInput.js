import React, { useState } from 'react'
import { Input } from 'react-native-elements'

const FloatingLabelInput = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <Input
      label={isFocused || props.value ? props.label : ' '}
      labelStyle={props.labelStyle}
      placeholder={!isFocused ? props.placeholder : null}
      inputStyle={props.inputStyle}
      inputContainerStyle={props.inputContainerStyle}
      containerStyle={props.containerStyle}
      onChangeText={props.onChangeText}
      placeholderTextColor={props.placeholderTextColor}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      InputComponent={props.InputComponent}
      onFocus={handleFocus}
      onBlur={handleBlur}
      keyboardType={props.keyboardType}
    />
  )
}
export default FloatingLabelInput