import React from 'react';
import SideNav from './component/SideNav';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Liked from './pages/Liked';
import Follow from './pages/Follow';
import Signin from './pages/SignIn';

// Définir le thème MUI
const theme = createTheme({
    palette: {
        primary: {
            main: '#9b59b6',
        },
        background: {
            default: '#000000',
        },
    },
});

// Composant pour gérer l'affichage du SideNav
const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signup' || location.pathname === '/signin'; // Vérifiez si l'utilisateur est sur la page de connexion

    return (
        <>
            {!isLoginPage && <SideNav />} {/* N'affichez SideNav que si ce n'est pas la page de connexion */}
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Home />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/follow" element={<Follow />} />
            </Routes>
        </>
    );
};

// Composant principal de l'application
export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Layout /> {/* Utiliser le composant Layout */}
            </ThemeProvider>
        </BrowserRouter>
    );
}
