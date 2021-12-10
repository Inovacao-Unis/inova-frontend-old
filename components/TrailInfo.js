/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import {
  Flex,
  Box,
  Progress,
  Text,
  Avatar,
  Button,
  useToast,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const TrailInfo = ({ trail, team, painel }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(null);

  const copyCodeToClipboard = (url) => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';
    navigator.clipboard.writeText(origin + url);

    toast({
      title: 'Link copiado',
      position: 'bottom-left',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleModal = (response) => {
    setSelect(response);
    onOpen();
  };

  // eslint-disable-next-line consistent-return
  function createMarkup(content) {
    if (content) {
      return {
        __html: content,
      };
    }
  }

  return (
    <>
      <Flex
        direction="column"
        align="center"
        borderRadius="5px"
        py="2rem"
        px="0"
        mb="2rem"
        bgColor="white"
        color="black"
      >
        <Flex
          align="center"
          justify="space-between"
          w="100%"
          maxW="100%"
          py="0"
          px="2rem"
          mb="3rem"
        >
          <Flex direction="column">
            <Text
              fontSize="1.4rem"
              lineHeight="1.6rem"
              fontWeight="bold"
              maxW="200px"
              color="highlight"
            >
              {trail?.title}
            </Text>
            <Text mb="5px" color="highlight" fontSize="xs">
              {trail?.schedule}
            </Text>
            <Button
              size="xs"
              mb="20px"
              bg="highlight"
              _hover={{ bg: 'highlight' }}
              color="white"
              onClick={() => copyCodeToClipboard(`/t/${trail?.code}`)}
            >
              Copiar link da trilha
            </Button>
            {!painel && team ? (
              <>
                <Text fontSize="xs" color="highlight">
                  Time
                </Text>
                <Text
                  fontSize="1.1rem"
                  fontWeight="bold"
                  maxW="200px"
                  mb="20px"
                  color="highlight"
                >
                  {team?.name}
                </Text>
                <Text fontSize="xs" color="highlight">
                  Desafio
                </Text>
                <Text
                  fontSize="1.1rem"
                  fontWeight="bold"
                  lineHeight="1rem"
                  maxW="300px"
                  mb="5px"
                  color="highlight"
                >
                  {team?.challenge?.title}
                </Text>
                <Button
                  size="xs"
                  bgColor="white"
                  border="2px"
                  borderColor="highlight"
                  color="highlight"
                  _hover={{ bg: 'white' }}
                  mb="30px"
                  onClick={() => handleModal(team.challenge)}
                >
                  Ver o conteúdo do desafio
                </Button>
              </>
            ) : null}
          </Flex>
          {!painel && team?.category?.image ? (
            <Avatar
              size="xl"
              src={team?.category?.image}
              alt="Imagem da jornada"
            />
          ) : null}
        </Flex>
        {!painel ? (
          <Box w="100%" maxW="100%" py="0" px="2rem">
            <Flex justify="space-between" align="center" mb="0.5rem">
              <Text color="highlight" fontWeight="bold">
                Seu progresso:
              </Text>
              <Text color="highlight">{team?.progress}/100%</Text>
            </Flex>
            <Box>
              <Progress hasStripe colorScheme="pink" value={team?.progress} />
            </Box>
          </Box>
        ) : null}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{select?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              dangerouslySetInnerHTML={
                select?.content && createMarkup(select?.content)
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrailInfo;
