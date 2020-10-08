import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIN = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    return mutate({variables: { username, password }});
  };

  return [signIn, result];
};

export default useSignIN;