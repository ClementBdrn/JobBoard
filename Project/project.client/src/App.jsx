import React from 'react';
import SideNav from './components/SideNav';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Follow from './pages/Apply';
import Favorite from './pages/Favorites';
import Apply from './pages/Apply';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9b59b6',
        },
        background: {
            default: '#0D0D0D',
        },
    },
});

const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signup' || location.pathname === '/signin';

    return (
        <Box sx={{ display: 'flex', height: '100%'}}>
            {!isLoginPage && (
                <Box>
                    <SideNav />
                </Box>
            )}
            <Box component="main" sx={{ flexGrow: 1, height: '100%'}}>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route path="/apply" element={<Apply />} />
                </Routes>
            </Box>
        </Box>
    );
};

// Composant principal de l'application
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </ThemeProvider>
    );
}