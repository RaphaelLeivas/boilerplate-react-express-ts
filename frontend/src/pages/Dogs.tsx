import React, { useState, useEffect, useContext, useCallback } from 'react';
import parse from 'html-react-parser';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import RefreshIcon from '@mui/icons-material/Refresh';

import { api } from '../services';
import { MainContext } from '../@types';

const Dogs = () => {
  const { setSnackbar } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [dogMedia, setDogMedia] = useState<string | JSX.Element | JSX.Element[]>('');

  const getDog = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`https://random.dog/`);

      let htmlResponse = response.data;
      if (!htmlResponse || typeof htmlResponse !== 'string') {
        throw new Error('Resposta da API mal formatada!');
      }

      // GAMBIARRA: adiciona manualmente a URL da hospedagem na src da mídia (imagem ou video)
      htmlResponse = htmlResponse.replace('src="', 'src="https://random.dog/');
      setDogMedia(parse(htmlResponse));
    } catch (error) {
      console.error(error);
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar o dog!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar]);

  useEffect(() => {
    getDog();
  }, [getDog]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          component="div"
          sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        >
          <Card
            sx={{
              maxWidth: { xs: 250, md: 600 },
              borderRadius: 16,
              p: 4,
              bgcolor: '#333333',
            }}
            elevation={16}
          >
            <Button
              variant="contained"
              startIcon={<RefreshIcon sx={{ color: 'black' }} />}
              onClick={getDog}
            >
              Novo Dog
            </Button>
            {dogMedia}
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dogs;
