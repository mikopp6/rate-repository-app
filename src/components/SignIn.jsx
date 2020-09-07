import React from 'react';

import { View, Button, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

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
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;