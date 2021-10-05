import { useRef } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

function AlertComp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Button onClick={onOpen}>Discard</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Trilha adicionada!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Redireionando para suas trilhas</AlertDialogBody>
          <AlertDialogFooter>
            <Button bg="highlight" ml={3}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AlertComp;
