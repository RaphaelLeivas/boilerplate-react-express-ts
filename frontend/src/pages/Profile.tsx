import React, { useState, useEffect, useContext, useCallback } from 'react';
import moment from 'moment';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import { MainContext } from '../@types';
import { LoginService } from '../api';

interface IProfileData {
  username: string;
  createdAt: string;
}

interface ISpacedInformation {
  leftInfo: string;
  rightInfo: string;
}

const SpacedInformation = ({ leftInfo, rightInfo }: ISpacedInformation) => (
  <Box
    width="100%"
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      mt: 4,
    }}
  >
    <Typography variant="body2">{leftInfo}</Typography>
    <Typography variant="body2">{rightInfo}</Typography>
  </Box>
);

const Profile = () => {
  const { setSnackbar, setThemeMode, themeMode } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IProfileData>();

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const getProfileData = useCallback(async () => {
    try {
      setLoading(true);

      const profile = await LoginService.profile();
      setUserData({
        ...profile,
        createdAt: moment(profile.createdAt).format('DD/MM/YYYY HH:mm'),
      });
    } catch (error) {
      console.error(error);
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar dados do perfil!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <Container maxWidth="xs">
      {loading || !userData ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }} >
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Meu Perfil
            </Typography>
            <SpacedInformation leftInfo="Nome de usuário:" rightInfo={userData.username} />
            <SpacedInformation leftInfo="Cadastrado em:" rightInfo={userData.createdAt} />
          </Box>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark'  }}>
              <SettingsIcon />
            </Avatar>
            <Typography variant="h5">Configurações</Typography>

            <Box
              width="100%"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Typography variant="body1">Tema:</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={themeMode === 'light' ? true : false} />}
                  label={themeMode === 'light' ? 'Claro' : 'Escuro'}
                  onChange={toggleTheme}
                />
              </FormGroup>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Profile;
