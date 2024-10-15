import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Menu, MenuItem } from '@mui/material';
import { Person } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { AppContext } from '../context/AppContext.jsx';
import { useVerificationToken } from '../hooks/useVerificationToken';

export default function Home() {
    const { idPeople, setIdPeople } = useContext(AppContext);
    const [advertisements, setAdvertisements] = useState([]); // Stocker les annonces récupérées
    const [filteredAdvertisements, setFilteredAdvertisements] = useState([]); // Stocker les annonces filtrées
    const [selectedAd, setSelectedAd] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Vérification du token d'authentification
    useVerificationToken();

    // Récupérer les annonces au chargement de la page
    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/advertisements');
                if (response.ok) {
                    const data = await response.json();
                    setAdvertisements(data);
                    setFilteredAdvertisements(data); // Initialement, afficher toutes les annonces
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);
            }
        };

        fetchAdvertisements();
    }, []);

    // Gestion des résultats de recherche
    const handleSearchResults = (searchResults) => {
        setFilteredAdvertisements(searchResults); // Mettre à jour la liste des annonces filtrées
    };

    // Menu actions
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavProfil = async () => {
        try {
            const response = await fetch("https://localhost:7007/api/Profil", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idPeople }),
            });
            if (response.ok) {
                const user = await response.json();
                navigate('/profil', { state: { user } });
            }
        } catch (error) {
            console.log("Erreur lors du chargement du profil.");
        }
    };

    const handleNavSettings = () => {
        navigate('/admin');
    };

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
                    setIdPeople(0);
                    navigate('/');
                }
            } catch (error) {
                console.log("Erreur lors de la déconnexion.");
            }
        };

        disconnect();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '83vw', backgroundColor: '#1e1E1E', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    HOME
                </Typography>

                {/* Barre de recherche avec la fonction handleSearchResults */}
                <SearchBar onSearch={handleSearchResults} advertisements={advertisements} />

                <Person sx={{ color: '#AC5FE9', marginLeft: 2, cursor: 'pointer' }} onClick={handleMenuClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'black',
                            color: 'violet',
                        },
                    }}
                >
                    <MenuItem onClick={handleNavProfil} sx={{ color: 'violet' }}>Profil</MenuItem>
                    <MenuItem onClick={handleNavSettings} sx={{ color: 'violet' }}>Paramètres</MenuItem>
                    <MenuItem onClick={handleNavSignIn} sx={{ color: 'violet' }}>Se déconnecter</MenuItem>
                </Menu>
            </Box>

            <Grid container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 40px 0 40px' }}>
                {/* Passer les annonces récupérées ou filtrées à JobList */}
                <JobList onAdSelect={setSelectedAd} advertisements={filteredAdvertisements} />

                {/* JobDetails reçoit l'annonce sélectionnée */}
                <JobDetails selectedAd={selectedAd} />
            </Grid>
        </Box>
    );
}