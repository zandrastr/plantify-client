import { FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, VStack, Link as ChakraLink, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ISignupData } from '../models/auth.model';
import { signup } from '../services/auth.services';
import { useState } from 'react';

const SignupPage = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    getValues,
  } = useForm<ISignupData>();

  const onSubmit: SubmitHandler<ISignupData> = async ({ name, email, password }) => {
    setServerErrorMessage('');
    try {
      const requestBody = { name, email, password };
      await signup(requestBody);
      localStorage.setItem('email', email);
      navigate('/login');
    } catch (error: any) {
      console.error('Error submitting signup data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  const validateRepeatPassword = (value: string) => {
    const password = getValues('password');
    return password === value || 'Passwords do not match';
  };

  return (
    <VStack>
      <Image boxSize='150px' objectFit='cover' src='' fallbackSrc='https://via.placeholder.com/150' alt='' />
      <Heading>Signup</Heading>
      <Text color='red'>{serverErrorMessage}</Text>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl isInvalid={errors.name !== undefined}>
          <FormLabel htmlFor='name'>First name</FormLabel>
          <Input
            id='name'
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Minimum length should be 2' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email !== undefined}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email is not in a valid format',
              },
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password !== undefined}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            id='password'
            type='password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 4, message: 'Password should have at least 4 characters' },
            })}
          />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.repeatPassword !== undefined}>
          <FormLabel htmlFor='repeatPassword'>Repeat password</FormLabel>
          <Input
            id='repeatPassword'
            type='password'
            {...register('repeatPassword', {
              required: 'Repeat password is required',
              validate: validateRepeatPassword,
            })}
          />
          <FormErrorMessage>{errors.repeatPassword && errors.repeatPassword.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
          Register
        </Button>
      </form>
      <Text> Already a user?</Text>
      <ChakraLink as={ReactRouterLink} to='/login'>
        Login
      </ChakraLink>
    </VStack>
  );
};

export default SignupPage;
