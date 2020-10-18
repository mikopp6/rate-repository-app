import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderDropdown = ({ listOrder, setListOrder }) => {
  return (
    <Picker
      selectedValue={listOrder}
      onValueChange={(value) => setListOrder(value)}
    >
      <Picker.Item label= 'Latest repositories' value= 'CREATED_AT/DESC' />
      <Picker.Item label= 'Highest rated repositories' value= 'RATING_AVERAGE/DESC' />
      <Picker.Item label= 'Lowest rated repositories' value= 'RATING_AVERAGE/ASC' />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, listOrder, setListOrder }) => {
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
      ListHeaderComponent={() =>
        <OrderDropdown listOrder={listOrder} setListOrder={setListOrder} />
      }
      renderItem={({ item }) =>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelect(item.id)}>
          <RepositoryItem item={item} isSingleView={false}/>
        </TouchableOpacity>
      }
    />
  );
};

const RepositoryList = () => {
  const [listOrder, setListOrder] = useState('CREATED_AT/DESC');
  const { repositories } = useRepositories(listOrder);

  return <RepositoryListContainer repositories={repositories} listOrder={listOrder} setListOrder={setListOrder}/>;
};

export default RepositoryList;