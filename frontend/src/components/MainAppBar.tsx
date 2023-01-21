import React, { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/styles';

import logoCompany from '../assets/logo-company.png';
import { useNavigation } from '../navigation';
import { AuthService } from '../services';
import { MainContext } from '../@types';
import { DRAWER_WIDTH } from '../theme';
import MainDrawer from './MainDrawer';

const MainAppBar = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { isDrawerOpen, setIsDrawerOpen } = useContext(MainContext);
  const username = AuthService.getUsername();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const hangleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    AuthService.logout();
    navigation('/login');
  };

  const CustomMenuItem = ({ name, onClick }: { name: string; onClick: () => void }) => (
    <MenuItem
      onClick={onClick}
      sx={{
        background: 'white',
        '&:hover': {
          background: theme.palette.primary.dark + '77',
          transition: '0.2s',
        },
      }}
    >
      <Typography color="black">{name}</Typography>
    </MenuItem>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: `calc(100% - ${isDrawerOpen ? DRAWER_WIDTH : 0}px)`,
          ml: `${isDrawerOpen ? DRAWER_WIDTH : 0}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
          {!isDrawerOpen && (
            <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={hangleToggleDrawer}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
          )}

          <Link href="/">
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 30 },
                maxWidth: { xs: 200, md: 750 },
              }}
              alt="Logo do Boilerplate"
              src={logoCompany}
            />
          </Link>
          <Box
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Box display="flex" flexDirection="column" sx={{ textAlign: 'right' }}>
              <Typography sx={{ color: 'black' }}>{username}</Typography>
              <Typography sx={{ color: 'black' }}>Bem-vindo!</Typography>
            </Box>
            <IconButton size="large" onClick={handleOpenMenu} color="inherit">
              <AccountCircle sx={{ color: 'black' }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <CustomMenuItem name="Meu Perfil" onClick={handleCloseMenu} />
              <CustomMenuItem name="Sair" onClick={handleLogout} />
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <MainDrawer />
    </>
  );
};

export default MainAppBar;
