import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorField: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error ? styles.errorField : [style];


  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;