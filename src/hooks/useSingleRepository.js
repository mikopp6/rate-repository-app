import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  return { repository: data ? data.repository : undefined, ...result };
};

export default useSingleRepository;