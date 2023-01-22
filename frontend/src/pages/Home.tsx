import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { api } from '../services';
import { USER_CARD_WIDTH } from '../theme';
import { IRandomUser, MainContext } from '../@types';

const RANDOM_USER_API_VERSION = '1.4';
const RANDOM_USER_API_NUMBER_OF_RESULTS = '6';
const RANDOM_USER_API_PASSWORD_TYPE = 'upper,lower,number,10-16';
const RANDOM_USER_API_RESPONSE_FORMAT = 'json';
const RANDOM_USER_API_NATIONALITIES = 'br,us';
const MAX_NUMBER_OF_PAGES = 5;

const Home = () => {
  const { setSnackbar, setMode } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IRandomUser[]>([]);
  const [originalUsers, setOriginalUsers] = useState<IRandomUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const seedId = useRef('');

  const handleFilter = (filter: string) => {
    if (!filter) {
      setUsers(originalUsers);
    }

    const filteredUsers = originalUsers.filter((user) => {
      const lowerCaseFilter = filter.toLowerCase();

      return (
        user.name.toLowerCase().includes(lowerCaseFilter) ||
        user.username.toLowerCase().includes(lowerCaseFilter) ||
        user.email.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setUsers(filteredUsers);
  };

  const getNewUsersSeed = async () => {
    try {
      setLoading(true);
      const response = await api.get(`https://randomuser.me/api/${RANDOM_USER_API_VERSION}/`, {
        params: {
          results: RANDOM_USER_API_NUMBER_OF_RESULTS,
          password: RANDOM_USER_API_PASSWORD_TYPE,
          format: RANDOM_USER_API_RESPONSE_FORMAT,
          nat: RANDOM_USER_API_NATIONALITIES,
          page: 1,
        },
      });

      if (!response || !response.data || !Array.isArray(response.data.results)) {
        throw new Error('Reposta da API mal formatada!');
      }

      const formattedUsers = response.data.results.map((result: any, index: number) => ({
        id: result.id.value,
        name: result.name.first + ' ' + result.name.last,
        email: result.email,
        username: result.login.username,
        age: result.dob.age,
        photo: result.picture.medium,
      }));

      setUsers(formattedUsers);
      setOriginalUsers(formattedUsers);
      seedId.current = response.data.info.seed;
    } catch (error) {
      console.error(error);
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar usuários!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  };

  const getNextPage = async () => {
    try {
      if (!seedId.current) {
        return;
      }

      setLoading(true);
      const response = await api.get(`https://randomuser.me/api/${RANDOM_USER_API_VERSION}/`, {
        params: {
          results: RANDOM_USER_API_NUMBER_OF_RESULTS,
          password: RANDOM_USER_API_PASSWORD_TYPE,
          format: RANDOM_USER_API_RESPONSE_FORMAT,
          nat: RANDOM_USER_API_NATIONALITIES,
          page: currentPage,
          seed: seedId.current,
        },
      });

      if (!response || !response.data || !Array.isArray(response.data.results)) {
        throw new Error('Reposta da API mal formatada!');
      }

      const formattedUsers = response.data.results.map((result: any, index: number) => ({
        id: result.id.value,
        name: result.name.first + ' ' + result.name.last,
        email: result.email,
        username: result.login.username,
        age: result.dob.age,
        photo: result.picture.medium,
      }));

      setUsers(formattedUsers);
      setOriginalUsers(formattedUsers);
    } catch (error) {
      console.error(error);
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar usuários!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getNewUsersSeed();
  // }, []);

  // useEffect(() => {
  //   getNextPage();
  // }, [currentPage]);

  const handleChangePage = async (action: 'next' | 'previous') => {
    if (action === 'next') {
      setCurrentPage((prev) => (prev + 1 <= MAX_NUMBER_OF_PAGES ? prev + 1 : prev));
    } else {
      setCurrentPage((prev) => (prev - 1 >= 1 ? prev - 1 : prev));
    }
  };

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <TextField
          margin="normal"
          label="Filtro"
          autoFocus
          onChange={(e) => handleFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', md: '50%' } }}
          autoComplete="off"
        />
        <Button
          variant="contained"
          onClick={toggleTheme}
          startIcon={<RefreshIcon sx={{ color: 'black' }} />}
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          Novos Usuários
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          mb: 4,
          mt: 4,
        }}
      >
        <IconButton size="large" onClick={() => handleChangePage('previous')}>
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6">
          Página {currentPage} de {MAX_NUMBER_OF_PAGES}
        </Typography>
        <IconButton size="large" onClick={() => handleChangePage('next')}>
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {users.length ? (
            <Grid container>
              {users.map((user) => (
                <Grid
                  item
                  key={user.id}
                  xs={12}
                  lg={6}
                  sx={{ mb: 2 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Card
                    elevation={8}
                    sx={{
                      width: '100%',
                      maxWidth: USER_CARD_WIDTH,
                      bgcolor: '#111111',
                      borderRadius: 8,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar src={user.photo} sx={{ mr: 4, width: 64, height: 64 }} />
                      <Box sx={{ flexGrow: 1, borderLeft: 1, pl: 4, borderColor: 'primary.main' }}>
                        <Typography sx={{ mb: 2 }} variant="h6">
                          {user.name}, {user.age} anos
                        </Typography>
                        <Typography variant="body2">
                          <u>Email</u>: {user.email}
                        </Typography>
                        <Typography variant="body2">
                          <u>Nome de usuário</u>: {user.username}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>Nenhum usuário encontrado</Typography>
          )}
        </>
      )}
    </>
  );
};

export default Home;
