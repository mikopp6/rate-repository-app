import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import { useContext } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-native';

import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

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
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data ? data.authorizedUser : undefined;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <View style={styles.flexItemA}>
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Repositories</Text>
          </Link>
        </View>
        {authorizedUser ? (
          <>
            <View style={styles.flexItemA}>
              <TouchableOpacity onPress={onSignOut}>
                <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.flexItemA}>
              <Link to="/createreview" component={TouchableOpacity} >
                <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Create a reviev</Text>
              </Link>
            </View>
          </>
        ) : (
          <View style={styles.flexItemA}>
            <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
              <Text color='textSecondary' fontSize='subHeading' fontWeight='bold'>Sign in</Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;