import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorization = () => {

  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER);
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
};

export default useAuthorization;