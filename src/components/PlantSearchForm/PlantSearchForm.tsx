import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './PlantSearchForm.scss';

interface PlantSearchFormProps {
  onSubmit: SubmitHandler<{ plantName: string }>;
  isLoading: boolean;
}

const PlantSearchForm = ({ onSubmit, isLoading }: PlantSearchFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<{ plantName: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={errors.plantName !== undefined}>
        <Input
          className='formInput'
          placeholder='🔍 Plant name...'
          aria-label='Plant name'
          {...register('plantName', {
            required: 'Plant name is required',
          })}
        />
        <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
      </FormControl>

      <Button type='submit' isLoading={isLoading} className='submitButton'>
        Search
      </Button>
    </form>
  );
};

export default PlantSearchForm;
