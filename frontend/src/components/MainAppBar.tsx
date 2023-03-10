import React, { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

  const { isDrawerOpen, setIsDrawerOpen, isMobile } = useContext(MainContext);
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

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigation('/profile');
  };

  const CustomMenuItem = ({ name, onClick }: { name: string; onClick: () => void }) => (
    <MenuItem onClick={onClick}>
      <Typography>{name}</Typography>
    </MenuItem>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${isDrawerOpen ? DRAWER_WIDTH : 0}px)`,
          borderRadius: 0,
          ml: isMobile ? '0px' : `${isDrawerOpen ? DRAWER_WIDTH : 0}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar sx={{ bgcolor: theme.palette.primary.dark }}>
          {!isDrawerOpen && (
            <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={hangleToggleDrawer}>
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
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
            {isMobile ? (
              <React.Fragment />
            ) : (
              <Box display="flex" flexDirection="column" sx={{ textAlign: 'right' }}>
                <Typography>{username}</Typography>
                <Typography>Bem-vindo!</Typography>
              </Box>
            )}
            <IconButton size="large" onClick={handleOpenMenu}>
              <AccountCircleIcon
                sx={{ width: 30, height: 30, color: theme.palette.text.primary }}
              />
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
              <CustomMenuItem name="Meu Perfil" onClick={handleProfileClick} />
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
