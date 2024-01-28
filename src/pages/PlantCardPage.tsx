import { Box, Heading, Image, Link, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';
import { useContext, useEffect, useState } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlant, savePlant, savePlantOnShare } from '../services/plant.services';
import { addPlant, removePlant } from '../services/user.services';
import ConfirmModal from '../components/ConfirmModal';
import WebShare from '../components/WebShare';

const PlantCardPage = () => {
  const { currentUser, addToFavorites, removeFromFavorites, isLoggedIn, isPlantInFavorites } = useContext(UserContext) as IUserContext;
  const [plantInfo, setPlantInfo] = useState<IPlantModel | null>(null);
  const [foundPlantInDb, setFoundPlantInDb] = useState<IPlantModel | null>(null);
  const { isOpen: isConfirmModalOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const navigate = useNavigate();
  const { latinName } = useParams();

  useEffect(() => {
    if (latinName) {
      try {
        const getPlantFromDb = async () => {
          const plant = await getPlant(latinName);
          setPlantInfo(plant);
        };
        getPlantFromDb();
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  }, []);

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
      onOpenConfirmModal();
      return;
    }

    if (currentUser && plantInfo) {
      try {
        if (foundPlantInDb) {
          if (isPlantInFavorites(foundPlantInDb._id!)) {
            throw 'Plant already in favorites';
          }
          await addPlant(currentUser._id, foundPlantInDb._id!);
          setPlantInfo(foundPlantInDb);
          addToFavorites(foundPlantInDb);
        } else {
          const { createdPlant } = await savePlant(currentUser._id, plantInfo);
          setPlantInfo(createdPlant);
          addToFavorites(createdPlant);
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
        await removePlant(currentUser._id, plantInfo._id!);
        removeFromFavorites(plantInfo._id!);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  const handleShare = async () => {
    if (plantInfo && !foundPlantInDb) {
      const { plant } = await savePlantOnShare(plantInfo);
      setFoundPlantInDb(plant);
    }
  };

  return (
    <>
      <VStack>
        <Image boxSize='150px' src={plantInfo?.imageUrl} fallbackSrc='https://via.placeholder.com/150' alt={plantInfo?.name} />
        <Heading>{plantInfo?.name}</Heading>
        <Heading>{plantInfo?.latinName}</Heading>
        <Link onClick={addPlantToFavorites}>Save to favorites</Link>
        {plantInfo?._id && <Link onClick={removePlantFromFavorites}>Remove from favorites</Link>}
        <Text>{plantInfo?.description}</Text>
        <Text>{plantInfo?.waterNeeds}</Text>
        <Text>{plantInfo?.sunNeeds}</Text>
        <Box onClick={handleShare}>{plantInfo && <WebShare name={plantInfo.name} latinName={plantInfo.latinName} />}</Box>
      </VStack>

      <ConfirmModal
        message={`Please login to save the plant`}
        buttonText='Login'
        isOpen={isConfirmModalOpen}
        onClose={onCloseConfirmModal}
        onOpen={onOpenConfirmModal}
        mainFunction={() => navigate('/login')}
      />
    </>
  );
};

export default PlantCardPage;
