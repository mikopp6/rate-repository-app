import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from "react-router-native";
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
      <ScrollView horizontal>
        <View style={styles.flexItemA}>
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Repositories</Text>
          </Link>
        </View>
        <View style={styles.flexItemB}>
          <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
            <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;