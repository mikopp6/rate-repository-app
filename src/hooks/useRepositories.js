import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (listOrder) => {
  const [orderBy, orderDirection] = listOrder.split('/');
  
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection }
  });
  
  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;