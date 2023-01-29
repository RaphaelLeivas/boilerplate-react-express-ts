import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigation } from '../navigation';
import { AuthService } from '../services';
import { MainContext } from '../@types';
import loginImage from '../assets/login-image.jpg';
import { LoginService } from '../api';

interface ILoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const INITIAL_LOGIN_FORM_DATA: ILoginFormData = {
  username: '',
  password: '',
  rememberMe: true,
};

const SNACKBAR_DELAY_MILISECONDS = 500;

const Copyright = (props: TypographyProps) => (
  <Typography variant="body2" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://reactjs.org/">
      Boilerplate
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const Login = () => {
  const navigation = useNavigation();
  const { setSnackbar } = useContext(MainContext);

  const [formData, setFormData] = useState<ILoginFormData>(INITIAL_LOGIN_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.rememberMe) {
      AuthService.setStorage(localStorage);
    } else {
      AuthService.setStorage(sessionStorage);
    }

    try {
      setLoading(true);

      const { token, username } = await LoginService.login(formData)

      AuthService.setUsername(username);
      AuthService.setToken(token);

      setSnackbar((prev) => ({
        ...prev,
        message: 'Logado com sucesso',
        type: 'success',
        open: true,
      }));

      setTimeout(() => navigation('/home'), SNACKBAR_DELAY_MILISECONDS);
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Usuário ou senha incorretos!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormDataCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  useEffect(() => AuthService.logout(), []);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} md={5}>
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark'  }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Usuário"
                name="username"
                autoFocus
                value={formData.username}
                onChange={handleFormDataChange}
                autoComplete="off"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                value={formData.password}
                onChange={handleFormDataChange}
                autoComplete="off"
              />
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    name="rememberMe"
                    color="primary"
                    checked={formData.rememberMe}
                    onChange={handleFormDataCheck}
                  />
                }
              />
              {loading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
              )}
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Link href="#" variant="body2">
                    Esqueci minha senha.
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link href="#" variant="body2">
                    Sem conta? Cadastre-se!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
