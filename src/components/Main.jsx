import React from 'react';
import { StyleSheet, View } from 'react-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
    //<NativeRouter>
    //  <Text style={{ paddingTop: 25, paddingBottom: 10 }} fontSize="heading">Rate Repository App</Text>
    //  <Link to='/' >
    //    <Text>Repositories</Text>
    //  </Link>
    //  <Link to='/signin' >
    //    <Text>Sign in</Text>
    //  </Link>
//
    //  <Route path='/signin' component={SignIn} />
    //  <Route exact path='/' component={RepositoryList} />
    //</NativeRouter>
  );
};

export default Main;