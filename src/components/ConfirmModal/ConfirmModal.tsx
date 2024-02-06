import { Button, Text, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody } from '@chakra-ui/react';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  message: string;
  buttonText: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mainFunction: () => void;
}

const ConfirmModal = ({ message, buttonText, isOpen, onClose, mainFunction }: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className='confirmModalWrapper'>
        <ModalBody>
          <Text className='modalText'>{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} className='modalCancelButton'>
            Cancel
          </Button>
          <Button onClick={mainFunction} className='modalActionButton'>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
