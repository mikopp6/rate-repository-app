import React from 'react';
import { useParams } from 'react-router-dom';
import { FlatList, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

import RepositoryItem from "./RepositoryItem";
import useSingleRepository from '../hooks/useSingleRepository';
import Text from './Text';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  mainContainer: {
    backgroundColor: 'white'
  },
  flexContainerA: {
    flexDirection: 'row',
    padding: 15
  },
  reviewRatingContainer: {
    padding: 10,
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 50/2
  },
  reviewRating: {
    alignSelf: 'center',
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold'
  },
  mainInfoContainer: {
    flexShrink: 1,
    paddingHorizontal: 10
  },
  reviewDate: {
    flexGrow: 1
  },
  reviewTextContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  reviewText: {

  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} isSingleView={true}/>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexContainerA}>
        <View style={styles.reviewRatingContainer}>
          <Text style={styles.reviewRating}>{review.rating}</Text>
        </View>
        <View style={styles.mainInfoContainer}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text style={styles.reviewDate}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, fetchMore } = useSingleRepository({
    id,
    first: 6
  });

  const singleRepo = repository
    ? repository
    : [];
  
  const reviews = repository
    ? singleRepo.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() =>
        <View>
          <RepositoryInfo repository={singleRepo} />
          <View style={styles.separator}></View>
        </View>
      }
    />
  );
};

export default SingleRepository;