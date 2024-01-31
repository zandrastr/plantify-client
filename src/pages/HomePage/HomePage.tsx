import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack, Button, useBreakpointValue, Box, HStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlantImage, getPlantInfo } from '../../services/plant.services';
import { useTheme } from '@chakra-ui/react';
import { PiPottedPlant } from 'react-icons/pi';

export interface IPlantSearch {
  plantName: string;
}

const HomePage = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [plantNotFoundMessage, setPlantNotFoundMessage] = useState('');
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const theme = useTheme();
  const backgroundImage = "url('/bg-startpage.jpg')";

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<IPlantSearch>();

  useEffect(() => {
    localStorage.removeItem('plant');
  }, []);

  const onSubmit: SubmitHandler<IPlantSearch> = async ({ plantName }) => {
    setServerErrorMessage('');
    try {
      const plantInfoResult = await getPlantInfo(plantName);

      if (plantInfoResult.latinName.toLowerCase() === 'plantundefined') {
        setPlantNotFoundMessage('Plant not found.');
        return;
      }
      const plantImageResult = await getPlantImage(plantName);
      const plant = { ...plantInfoResult, imageUrl: plantImageResult };
      localStorage.setItem('plant', JSON.stringify(plant));
      navigate('/plant');
    } catch (error: any) {
      console.error('Error submitting plant search data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  return (
    <>
      {isMobile && (
        <VStack w='100%'>
          <Box w='100%' h='20vh' mb={20} display='flex' overflow='hidden' position='relative' backgroundImage={backgroundImage} backgroundSize='cover' backgroundPosition='center'>
            <Text
              fontFamily={theme.fonts.robotoMono}
              position='absolute'
              top='45%'
              left='50%'
              transform='translate(-50%, -50%)'
              textAlign='center'
              color={theme.colors.white}
              fontSize={['m', 'm', 'xl']}
              fontWeight='bold'
              w='70%'
            >
              Your AI-powered plant search engine & virtual plant library
            </Text>
          </Box>

          {plantNotFoundMessage !== '' && <Text color={theme.colors.warning}>{plantNotFoundMessage}</Text>}
          {serverErrorMessage !== '' && <Text color={theme.colors.warning}>{serverErrorMessage}</Text>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl isInvalid={errors.plantName !== undefined}>
              <FormLabel htmlFor='plantName'></FormLabel>
              <Input
                placeholder='Monstera...'
                id='plantName'
                {...register('plantName', {
                  required: 'Plant name is required',
                })}
                style={{ width: '300px', border: '2px solid black', borderRadius: '8px', padding: '10px' }}
              />
              <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
            </FormControl>

            <Button mt={6} pl={14} pr={14} colorScheme='green' type='submit' isLoading={isSubmitting} bg='black'>
              Search
            </Button>
          </form>
        </VStack>
      )}

      {!isMobile && (
        <VStack h='100%'>
          <Box w='100%' h='40vh' display='flex' overflow='hidden' position='relative' backgroundImage={backgroundImage} backgroundSize='cover' backgroundPosition='center'>
            <Text
              fontFamily={theme.fonts.robotoMono}
              position='absolute'
              top='38%'
              left='50%'
              transform='translate(-50%, -50%)'
              textAlign='center'
              color={theme.colors.white}
              fontSize={['2xl', '2xl', '3xl']}
              fontWeight='bold'
              width='50%'
            >
              Your AI-powered plant search engine & virtual plant library
            </Text>
          </Box>

          <Box w='100%' display='flex' justifyContent='center' position='relative'>
            <VStack mt={-40} pl={40} pr={40} py={40} bg={theme.colors.white} borderRadius={16} boxShadow='xl'>
              <HStack mb={8}>
                <PiPottedPlant fontSize={40} />
                <Heading fontFamily={theme.fonts.robotoMono} fontSize={['xl', 'xl', '3xl']} mt={2}>
                  Plantify
                </Heading>
              </HStack>
              {plantNotFoundMessage !== '' && <Text color='red'>{plantNotFoundMessage}</Text>}
              {serverErrorMessage !== '' && <Text color='red'>{serverErrorMessage}</Text>}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl isInvalid={errors.plantName !== undefined}>
                  <FormLabel fontSize={['xl', 'xl', '3xl']} htmlFor='plantName' />
                  <Input
                    placeholder='🔍 Monstera...'
                    id='plantName'
                    {...register('plantName', {
                      required: 'Plant name is required',
                    })}
                    style={{ width: '400px', border: '2px solid black', borderRadius: '8px', padding: '10px' }}
                  />
                  <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
                </FormControl>

                <Button mt={6} pl={14} pr={14} colorScheme='green' type='submit' isLoading={isSubmitting} bg='black'>
                  Search
                </Button>
              </form>
            </VStack>
          </Box>
        </VStack>
      )}
    </>
  );
};
export default HomePage;
