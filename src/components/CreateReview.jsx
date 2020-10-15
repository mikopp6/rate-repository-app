import React from 'react';
import * as yup from 'yup';
import { View, Button, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import useAddReview from '../hooks/useAddReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  textRating: null,
  text: ''
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  textRating: yup
    .number()
    .typeError('Rating must be a number between 0-100')
    .required('Rating is required')
    .min(0, 'Rating must be a number between 0-100')
    .max(100, 'Rating must be a number between 0-100'),
  text: yup
    .string()
    .optional()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' style={styles.input}/>
      <FormikTextInput name='repositoryName' placeholder='Repository name' style={styles.input}/>
      <FormikTextInput keyboardType='numeric' type='number' name='textRating' placeholder='Rating between 0 and 100' style={styles.input}/>
      <FormikTextInput name='text' placeholder='Review' multiline={true} style={styles.input}/>
      <Button onPress={onSubmit} title='Create a review' style={styles.itemA}/>
    </View>
  );
};

const CreateReview = () => {
  const history = useHistory();
  const [addReview] = useAddReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, textRating, text } = values;
    const rating = parseInt(textRating);
  
    try {
      const data = await addReview({ repositoryName, ownerName, rating, text });
      const id = data.createReview.repositoryId;
      history.push(`/${id}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );  
};

export default CreateReview;