import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import numeral from 'numeral';
import Text from './Text';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white'
  },
  flexContainerA: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  logoContainer: {
    flexGrow: 0,
    paddingRight: 10,
  },
  mainInfoContainer: {
    flexGrow: 1,
    flexWrap: 'wrap'
  },
  flexContainerB: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  flexItemA: {
    flexWrap: 'wrap'
  },
  flexItemB: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexContainerA}>
        <View style={styles.logoContainer}>
          <Image style={styles.tinyLogo} source={{uri:item.ownerAvatarUrl}}/>
        </View>
        <View style={styles.mainInfoContainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <View style={styles.flexItemA}>
            <Text color='textSecondary' backgroundColor='primary'>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainerB}>
        <View style={styles.flexItemB}>
          <Text fontWeight='bold'>{numeral(item.stargazersCount).format('0.0a')}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text fontWeight='bold'>{numeral(item.forksCount).format('0.0a')}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text fontWeight='bold'>{numeral(item.reviewCount).format('0a')}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>        
      </View>
    </View>
  );
};

export default RepositoryItem;