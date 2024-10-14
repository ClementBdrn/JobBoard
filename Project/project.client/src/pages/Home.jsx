import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Menu, MenuItem } from '@mui/material';
import { Person } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const { idPeople, people } = location.state || {};
    const navigate = useNavigate();

    const [selectedAd, setSelectedAd] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // Fonction pour ouvrir le menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Fonction pour fermer le menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavProfil = () => {
        navigate('/profil');
    }

    const handleNavSettings = () => {
        navigate('/admin');
    }

    const handleNavSignIn = () => {
        const disconnect = async () => {
            try {
                const response = await fetch("https://localhost:7007/api/Home/disconnect", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({ idPeople }),
                });

                if (response.ok) {

                    // Redirection vers la page d'accueil
                    navSignIn('/');
                }
            }
            catch {
                console.log("error disconnect");
            }
        };

        disconnect();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh',width: '83vw', backgroundColor: '#1e1E1E', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    HOME
                </Typography>

                {/* Barre de recherche */}
                <SearchBar />

                <Person sx={{ color: '#AC5FE9', marginLeft: 2, cursor: 'pointer' }} onClick={handleMenuClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} // V�rifie si le menu doit �tre ouvert
                    onClose={handleClose} // Ferme le menu
                    PaperProps={{
                        sx: {
                            backgroundColor: 'black', // Fond noir pour le menu
                            color: 'violet', // Texte violet
                        },
                    }}
                >
                    <MenuItem onClick={handleNavProfil} sx={{ color: 'violet' }}>Profil</MenuItem>
                    <MenuItem onClick={handleNavSettings} sx={{ color: 'violet' }}>Param&egrave;tres</MenuItem>
                    <MenuItem onClick={handleNavSignIn} sx={{ color: 'violet' }}>Se d&eacute;connecter</MenuItem>
                </Menu>
            </Box>

            <Grid container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 40px 0 40px' }}>
                <JobList idPeople={idPeople} onAdSelect={setSelectedAd} />
                <JobDetails selectedAd={selectedAd} />
            </Grid>
        </Box>
    );
}

