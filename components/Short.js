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
} from '@chakra-ui/react';

import api from '../services/api';

function Short({ formId }) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const getResponse = async () => {
      await api
        .get(`team-response/${formId}`)
        .then((res) => {
          setTitle(res.data.items[0].response);
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

    return getResponse();
  }, [formId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await api
        .post('form-items', {
          title,
          form_id: formId,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setSuccess(true);
          }
        });
      setIsLoading(false);
    } catch (err) {
      setError('Error ', err);
      setIsLoading(false);
      setTitle('');
    }
  };

  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl isRequired id="response">
          <FormLabel>Resposta</FormLabel>
          <Input
            type="text"
            mb={4}
            _focus={{
              borderColor: '#bec3c9',
            }}
            isDisabled={isDisabled}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
