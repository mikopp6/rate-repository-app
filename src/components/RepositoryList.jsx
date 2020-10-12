import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handleSelect = (id) => {
    history.push(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelect(item.id)}>
          <RepositoryItem item={item} isSingleView={false}/>
        </TouchableOpacity>
      }
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;