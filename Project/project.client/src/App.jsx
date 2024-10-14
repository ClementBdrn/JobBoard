import React, { useState } from 'react'; // Ajout de useState
import SideNav from './components/SideNav';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material'; // Import de CircularProgress
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Follow from './pages/Apply';
import Favorite from './pages/Favorites';
import Apply from './pages/Apply';
import Admin from './pages/Admin';
import Profil from './pages/Profil';
import JobDetails from './components/JobDetails';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9b59b6',
        },
        background: {
            default: '#1E1E1E',
        },
    },
});

const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signup' || location.pathname === '/';

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            {!isLoginPage && (
                <Box>
                    <SideNav />
                </Box>
            )}
            <Box component="main" sx={{ flexGrow: 1, height: '100%' }}>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Signin />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/job-details" element={<JobDetails />} />
                </Routes>
            </Box>
        </Box>
    );
};

// Composant principal de l'application
export default function App() {
    const [isLoading, setIsLoading] = useState(false); // Ajout de l'�tat pour le loader

    // Simulez le chargement des donn�es ou une action asynchrone
    const handleLoadData = async () => {
        setIsLoading(true); // D�clencher le loader
        try {
            // Simuler une requ�te API ou une t�che asynchrone
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simule 2 secondes de d�lai
        } catch (error) {
            console.error("Erreur lors du chargement des donn�es :", error);
        } finally {
            setIsLoading(false); // D�sactiver le loader apr�s le chargement
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout />

                {/* Affichage conditionnel du loader */}
                {isLoading && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999
                        }}
                    >
                        <CircularProgress sx={{ color: '#9b59b6' }} />
                    </Box>
                )}
            </BrowserRouter>
        </ThemeProvider>
    );
}
