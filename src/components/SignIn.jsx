import React from 'react';
import * as yup from 'yup';
import { View, Button, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-dom';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 15
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  buttonA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' style={styles.input}/>
      <FormikTextInput name='password' placeholder='Password' style={styles.input} secureTextEntry />
      <Button onPress={onSubmit} title='Sign in' style={styles.itemA}/>
    </View>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;