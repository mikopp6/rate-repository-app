import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = ({ listOrder, setListOrder, setSearch }) => {
  return (
    <View style={{paddingHorizontal:10}}>
      <Picker selectedValue={listOrder} onValueChange={(value) => setListOrder(value)} >
        <Picker.Item label= 'Latest repositories' value= 'CREATED_AT/DESC' />
        <Picker.Item label= 'Highest rated repositories' value= 'RATING_AVERAGE/DESC' />
        <Picker.Item label= 'Lowest rated repositories' value= 'RATING_AVERAGE/ASC' />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder='Search...'
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
    </View>
    
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { listOrder, setListOrder, setSearch } = this.props;
    return (
      <ListHeader listOrder={listOrder} setListOrder={setListOrder} setSearch={setSearch} />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) =>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.handleSelect(item.id)}>
            <RepositoryItem item={item} isSingleView={false}/>
          </TouchableOpacity>
        }
      />
    );
  }
}

const RepositoryList = () => {
  const [listOrder, setListOrder] = useState('CREATED_AT/DESC');
  const [search, setSearch] = useState('');
  const [debouncedText] = useDebounce(search, 500);
  const { repositories } = useRepositories(listOrder, debouncedText);
  
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handleSelect = (id) => {
    history.push(`/${id}`);
  };

  return <RepositoryListContainer repositoryNodes={repositoryNodes} handleSelect={handleSelect} listOrder={listOrder} setListOrder={setListOrder} setSearch={setSearch}/>;
};

export default RepositoryList;