import { Box, Button, HStack, Heading, Image, Text, VStack, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { IPlantModel } from '../../models/plant.model';
import { useContext, useEffect, useState } from 'react';
import { IUserContext, UserContext } from '../../contexts/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlant, savePlant, savePlantOnShare } from '../../services/plant.services';
import { addPlant, removePlant } from '../../services/user.services';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import WebShare from '../../components/WebShare/WebShare';
import './PlantCardPage.scss';
import { FaDroplet, FaSun, FaRegHeart, FaHeart } from 'react-icons/fa6';
import { formatLatinNameDisplay } from '../../utils/app.utils';

const PlantCardPage = () => {
  const { currentUser, addToFavorites, removeFromFavorites, isLoggedIn, isPlantInFavorites } = useContext(UserContext) as IUserContext;
  const [plantInfo, setPlantInfo] = useState<IPlantModel | null>(null);
  const [foundPlantInDb, setFoundPlantInDb] = useState<IPlantModel | null>(null);
  const { isOpen: isConfirmModalOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      <Box className='plantCardTop'></Box>
      {plantInfo ? (
        <VStack className={`${isMobile ? 'wrapperMobile' : 'wrapperDesktop'}`}>
          <Image src={plantInfo?.imageUrl} alt={plantInfo?.name} />
          <Heading className='name'>{plantInfo?.name}</Heading>

          <HStack>
            <Box className='nameHeartWrapper'>
              <Heading className='latinName'>{formatLatinNameDisplay(plantInfo?.latinName)}</Heading>

              <Box className='heartSymbol'>
                {isPlantInFavorites(foundPlantInDb?._id!) ? (
                  <Button onClick={removePlantFromFavorites}>
                    <FaHeart aria-label='Remove plant from favorites' role='button' tabIndex={0} />
                  </Button>
                ) : (
                  <Button onClick={addPlantToFavorites}>
                    <FaRegHeart aria-label='Add plant to favorites' role='button' tabIndex={0} />
                  </Button>
                )}
              </Box>
            </Box>
          </HStack>

          <Text className='description'>{plantInfo?.description}</Text>

          <HStack className='sunWaterWrapper'>
            <FaDroplet aria-label='Care instructions, water' />
            <Text className='facts'>{plantInfo?.waterNeeds}</Text>
          </HStack>
          <HStack className='sunWaterWrapper'>
            <FaSun aria-label='Care instructions, sun' />
            <Text className='facts'>{plantInfo?.sunNeeds}</Text>
          </HStack>

          <Box className='shareButton' onClick={handleShare}>
            {plantInfo && <WebShare name={plantInfo.name} latinName={plantInfo.latinName} />}
          </Box>
        </VStack>
      ) : (
        <Text className='noPlantMessage'>No plant found</Text>
      )}

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
