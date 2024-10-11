import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea, Menu, MenuItem } from '@mui/material';
import { Search, Person } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const { idPeople } = location.state || {};

    // État pour gérer l'ouverture/fermeture du menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Fonction pour ouvrir le menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Fonction pour fermer le menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navProfil = useNavigate();
    const handleNavProfil = () => {
        navProfil('');
    }

    const navSettings = useNavigate();
    const handleNavSettings = () => {
        navSettings('');
    }

    const navSignIn = useNavigate();
    const handleNavSignIn = () => {
        navSignIn('/signin');
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '83vw', height: '100vh', backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    HOME
                </Typography>

                {/* Barre de recherche */}
                <SearchBar />

                <Person sx={{ color: '#AC5FE9', marginLeft: 2, cursor: 'pointer' }} onClick={handleMenuClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} // Vérifie si le menu doit être ouvert
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

            {/* Corps de la page */}
            <Grid container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 40px 0 40px' }}>
                {/* Colonne gauche : Liste des offres avec scroll */}
                <JobList idPeople={idPeople} />

                {/* Colonne droite : Détail de l'offre */}
                <JobDetails idPeople={idPeople} />
            </Grid>
        </Box>
    );
}

