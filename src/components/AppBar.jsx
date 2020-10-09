import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';

import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import useAuthorization from '../hooks/useAuthorization';

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
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const data = useAuthorization();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const isLoggedIn = data
    ? data.authorizedUser
    : false;

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <View style={styles.flexItemA}>
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Repositories</Text>
          </Link>
        </View>
        <View style={styles.flexItemB}>
          {isLoggedIn
            ? <Link to="/signin" component={TouchableOpacity} onPress={handleSignOut}>
                <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign out</Text>
              </Link>
            : <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
                <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign in</Text>
              </Link>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;