import React, { useContext } from 'react';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HailIcon from '@mui/icons-material/Hail';
import HomeIcon from '@mui/icons-material/Home';
import { SvgIconComponent } from '@mui/icons-material';

import { useTheme } from '@mui/styles';

import { MainContext } from '../@types';
import { DRAWER_WIDTH } from '../theme';
import { useNavigation, PagesList } from '../navigation';

const drawerListIcons: { name: string; route: PagesList; Icon: SvgIconComponent }[] = [
  { name: 'Clientes', route: '/clients', Icon: HailIcon },
];

const MainDrawer = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { isDrawerOpen, setIsDrawerOpen } = useContext(MainContext);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerClick = (nextPage: PagesList) => {
    navigation(nextPage);
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
        }}
      >
        <ListItem disablePadding onClick={() => handleDrawerClick('/home')}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
        <IconButton onClick={handleCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {drawerListIcons.map(({ name, route, Icon }) => (
          <ListItem key={name} disablePadding onClick={() => handleDrawerClick(route)}>
            <ListItemButton>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: '16px',
        }}
      >
        <Typography>{new Date().getFullYear()}</Typography>
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
