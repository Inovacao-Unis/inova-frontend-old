import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Alert,
  AlertIcon,
  FormHelperText,
} from '@chakra-ui/react';

import api from '../services/api';

function Short({ stage, trailId }) {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const getResponse = async () => {
      await api
        .get(`game-response?trailId=${trailId}&stage=${stage}`)
        .then((res) => {
          setResponse(res.data.response);
          setIsDisabled(true);
          setSuccess(true);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log('Ocorreu um erro. Tente novamente, por favor.');
          }
        });
    };

    if (trailId) {
      return getResponse();
    }
    return null;
  }, [trailId, stage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await api
        .post('responses', {
          response,
          stage,
          trailId,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setSuccess(true);
          }
        });
      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
      setIsLoading(false);
      setResponse('');
    }
  };

  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl isRequired id="response">
          <FormLabel fontSize="2xl">Resposta</FormLabel>
          <FormHelperText mt="0" mb="10px">
            Antes de enviar, confira sua resposta, pois não será possível
            editá-la depois.
          </FormHelperText>
          <Input
            type="text"
            mb={4}
            _focus={{
              borderColor: '#bec3c9',
            }}
            isDisabled={isDisabled}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </FormControl>
        {success ? (
          <Alert status="success" borderRadius="5">
            <AlertIcon />
            Resposta enviada com sucesso!
          </Alert>
        ) : (
          <Button
            bgColor="highlight"
            color="white"
            _hover={{ bg: 'highlight' }}
            type="submit"
            width="full"
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Enviar'
            )}
          </Button>
        )}
      </form>
    </Box>
  );
}

export default Short;
