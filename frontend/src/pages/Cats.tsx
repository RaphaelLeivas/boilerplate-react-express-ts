import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';

import { HTTP_STATUS_LIST } from '../constants';
import notFoundImage from '../assets/not-found.png';

const Cats = () => {
  const [formCode, setFormCode] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;

    if (key === 'Enter') {
      updateSelectedCode();
    }
  };

  const updateSelectedCode = () => {
    console.log('called', formCode, selectedCode);
    setSelectedCode(formCode);
  };
  const isValidHttpCode = HTTP_STATUS_LIST.find((status) => status === selectedCode);

  return (
    <>
      <Box
        component="div"
        sx={{ mb: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Autocomplete
          selectOnFocus
          disablePortal
          freeSolo
          options={HTTP_STATUS_LIST}
          sx={{ width: 300, mr: 4 }}
          // @ts-ignore - corrigir o erro de tipagem depois
          onSelect={(e: React.ChangeEvent<HTMLDivElement>) => setFormCode(e.target.value)}
          noOptionsText="Sem opções"
          openOnFocus
          PaperComponent={({ children }) => (
            <Paper style={{ background: '#333333' }}>
              <Typography component={'span'}>{children}</Typography>
            </Paper>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status HTTP"
              onChange={(e) => setFormCode(e.target.value)}
              value={formCode}
              onKeyDown={handleKeyPress}
              autoComplete="off"
            />
          )}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<SearchIcon />}
          onClick={updateSelectedCode}
        >
          Buscar
        </Button>
      </Box>

      {selectedCode.length ? (
        <Card
          sx={{
            maxWidth: { xs: 250, md: 600 },
            borderRadius: 16,
            p: 4,
            bgcolor: '#000000',
          }}
          elevation={16}
        >
          {isValidHttpCode && (
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography align="center" variant="h5">
                Status {selectedCode}
              </Typography>
              <Button variant="outlined">
                <Link
                  href={`https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/${selectedCode}`}
                  variant="body1"
                  target="_blank"
                  rel="noreferrer"
                  underline="none"
                >
                  Saiba Mais
                </Link>
              </Button>
            </Box>
          )}

          <Box
            component="img"
            sx={{
              maxWidth: { xs: 250, md: 600 },
            }}
            alt="Imagem de um gato conforme o status HTTP selecionado."
            src={isValidHttpCode ? `https://http.cat/${selectedCode}` : notFoundImage}
          />
        </Card>
      ) : null}
    </>
  );
};

export default Cats;
