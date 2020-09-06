import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    height: 75,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexItemA: {
    flexGrow: 0,
    padding: 15,
  },
  flexItemB: {
    flexGrow: 0,
    padding: 15,
  }
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <TouchableWithoutFeedback>
          <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Repositories</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.flexItemB}>
        <TouchableWithoutFeedback>
          <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign in</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default AppBar;