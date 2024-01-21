import { Button, Heading, Image, Link, Text, VStack } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';
import { useContext, useEffect, useState } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { getPlant, savePlant } from '../services/plant.services';
import { addPlant, removePlant } from '../services/user.services';

const PlantCardPage = () => {
  const { currentUser, addToFavorites, removeFromFavorites, isLoggedIn, isPlantInFavorites } = useContext(UserContext) as IUserContext;
  const [plantInfo, setPlantInfo] = useState<IPlantModel | null>(null);
  const [foundPlantInDb, setFoundPlantInDb] = useState<IPlantModel | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const plantResult = localStorage.getItem('plant');

    if (plantResult) {
      const plantInLocalStorage = JSON.parse(plantResult);
      const foundPlantInUserFavorites = currentUser?.favorites.find((item) => item.latinName === plantInLocalStorage.latinName);

      if (foundPlantInUserFavorites) {
        setPlantInfo(foundPlantInUserFavorites);
      } else {
        setPlantInfo(plantInLocalStorage);
      }
    }
  }, []);

  useEffect(() => {
    if (plantInfo && plantInfo?._id === undefined) {
      checkIfPlantExists();
    }
  }, [plantInfo]);

  const checkIfPlantExists = async () => {
    if (plantInfo) {
      try {
        const foundPlant = await getPlant(plantInfo.latinName);
        if (foundPlant) {
          setFoundPlantInDb(foundPlant);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  const addPlantToFavorites = async () => {
    if (!isLoggedIn) {
      // FIX: create modal that redirects to login
      navigate('/login');
      return;
    }

    if (currentUser && plantInfo) {
      try {
        if (foundPlantInDb) {
          if (isPlantInFavorites(foundPlantInDb._id!)) {
            throw 'Plant already in favorites';
          }
          const { message } = await addPlant(currentUser._id, foundPlantInDb._id!);
          setPlantInfo(foundPlantInDb);
          addToFavorites(foundPlantInDb);
          setSuccessMessage(message);
        } else {
          const { message, createdPlant } = await savePlant(currentUser._id, plantInfo);
          setPlantInfo(createdPlant);
          addToFavorites(createdPlant);
          setSuccessMessage(message);
          setFoundPlantInDb(createdPlant);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  const removePlantFromFavorites = async () => {
    if (currentUser && plantInfo) {
      try {
        const { message } = await removePlant(currentUser._id, plantInfo._id!);
        setSuccessMessage(message);
        removeFromFavorites(plantInfo._id!);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  return (
    <VStack>
      <Image boxSize='150px' src={plantInfo?.imageUrl} fallbackSrc='https://via.placeholder.com/150' alt={plantInfo?.name} />
      <Heading>{plantInfo?.name}</Heading>
      <Heading>{plantInfo?.latinName}</Heading>
      <Link onClick={addPlantToFavorites}>Save to favorites</Link>
      {plantInfo?._id && <Link onClick={removePlantFromFavorites}>Remove from favorites</Link>}
      <Text>{plantInfo?.description}</Text>
      <Text>{plantInfo?.waterNeeds}</Text>
      <Text>{plantInfo?.sunNeeds}</Text>
      <Button>Share</Button>
    </VStack>
  );
};

export default PlantCardPage;
