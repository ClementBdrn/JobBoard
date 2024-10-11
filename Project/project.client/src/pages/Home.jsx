import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Search, Person } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const { idPeople } = location.state || {};

    const navigate = useNavigate();

    const handleSubmit = () => {
        // Redirection vers la page d'accueil
        navigate('/signin');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '83vw', height: '100vh', backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    HOME
                </Typography>

                {/* Barre de recherche */}
                <SearchBar />

                <Person sx={{ color: '#AC5FE9', marginLeft: 2, cursor: 'pointer' }} onClick={handleSubmit} />
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

