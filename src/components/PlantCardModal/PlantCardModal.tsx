import { Button, Heading, Image, Text, VStack, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, HStack, useBreakpointValue } from '@chakra-ui/react';
import { IPlantModel } from '../../models/plant.model';
import WebShare from '../WebShare/WebShare';
import './PlantCardModal.scss';
import { FaDroplet, FaSun } from 'react-icons/fa6';
import { formatLatinNameDisplay } from '../../utils/app.utils';

interface PlantCardModalProps {
  selectedPlant: IPlantModel;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const PlantCardModal = ({ selectedPlant, isOpen, onClose }: PlantCardModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className='modalWrapper'>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Image className={`modalImg ${isMobile && 'modalImgMobile'}`} src={selectedPlant.imageUrl} alt={selectedPlant.name} />
            <Heading className='modalName'>{selectedPlant.name}</Heading>
            <Heading className='modalLatinName'>{formatLatinNameDisplay(selectedPlant.latinName)}</Heading>
            <Text className='modalDescription'>{selectedPlant.description}</Text>
            <HStack className='modalSunWaterWrapper'>
              <FaDroplet aria-label='Care instructions, water' />
              <Text className='modalFacts'>{selectedPlant?.waterNeeds}</Text>
            </HStack>
            <HStack className='modalSunWaterWrapper'>
              <FaSun aria-label='Care instructions, sun' />
              <Text className='modalFacts'>{selectedPlant?.sunNeeds}</Text>
            </HStack>
            <Button className='modalShareButton'>
              <WebShare name={selectedPlant.name} latinName={selectedPlant.latinName}></WebShare>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlantCardModal;
