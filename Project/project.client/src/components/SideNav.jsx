import * as React from 'react';
import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { AppContext } from '../context/AppContext.jsx';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

export default function SideNav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    let isAdmin = false;
    const { idPeople } = useContext(AppContext);
    if (idPeople == 1023) {
        isAdmin = true;
    }

    const navLinks = [
        { path: '/home', label: 'Home' },
        { path: '/favorite', label: 'Favoris' },
    ];

    if (isAdmin) {
        navLinks.push({ path: '/admin', label: 'Admin' });
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ '& .MuiDrawer-paper': { backgroundColor: 'black', borderRight: '2px solid #AC5FE9',},}}>
                <DrawerHeader>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', left: '-25px', position: 'relative' }}>
                        SOS CH&#212;MAGE
                    </Typography>
                    <IconButton onClick={() => setOpen(!open)} sx={{ color: '#AC5FE9', backgroundColor: 'black' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.path} disablePadding sx={{ display: 'block' }}>
                            <NavLink
                                to={link.path}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    color: isActive ? 'white' : 'inherit',
                                    width: '100%',
                                })}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        backgroundColor: (theme) => (link.path === window.location.pathname ? '#AC5FE9' : 'transparent'),
                                        '&:hover': {
                                            backgroundColor: '#AC5FE9',
                                            color: 'white',
                                        },
                                        color: (theme) => (link.path === window.location.pathname ? 'white' : 'inherit'),
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'inherit',
                                        }}
                                    >
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={link.label}
                                        sx={[open ? { opacity: 1, color: 'white' } : { opacity: 0, color: 'white' },]}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
