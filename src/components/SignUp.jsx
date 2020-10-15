import React from 'react';
import * as yup from 'yup';
import { View, Button, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-dom';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
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
    .required('Username is required')
    .min(1, 'Minimum username length is 1')
    .max(30, 'Maximum username length is 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Minimum password length is 5')
    .max(50, 'Maximum password length is 50'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords dont match')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' style={styles.input}/>
      <FormikTextInput name='password' placeholder='Password' style={styles.input} secureTextEntry />
      <FormikTextInput name='confirmPassword' placeholder='Password confirmation' style={styles.input} secureTextEntry />
      <Button testID='submitButton' onPress={onSubmit} title='Sign up' style={styles.itemA}/>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    } finally {
      history.push('/');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );  
};

export default SignUp;