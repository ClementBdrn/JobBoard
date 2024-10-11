import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, CardActionArea, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function JobList() {
    // État pour les annonces
    const [advertisements, setAdvertisements] = useState([]);
    // État pour les likes
    const [likedItems, setLikedItems] = useState([]);

    // Fonction pour gérer le clic sur le cœur
    const handleHeartClick = (index) => {
        const updatedLikes = [...likedItems];
        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);
    };

    // Récupérer les annonces depuis l'API
    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/advertisements');
                const data = await response.json();
                setAdvertisements(data);
                setLikedItems(Array(data.length).fill(false));
            }
            catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);
            }
        };

        fetchAdvertisements();
    }, []);

    return (
        <Grid
            item
            xs={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '86vh',
                overflowY: 'auto',
                paddingRight: '10px',
                marginTop: '0',
                minWidth: '30vw',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#1c1c1c',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#AC5FE9',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#8e44ad',
                },
            }}
        >
            <Box>
                {/* Affichage dynamique des annonces récupérées */}
                {advertisements.length > 0 ? (
                    advertisements.map((ad, index) => (
                        <Card
                            key={ad.Id} // Utilisez l'identifiant unique
                            sx={{
                                backgroundColor: 'black',
                                border: '1px solid #AC5FE9',
                                marginBottom: 2,
                                borderRadius: '10px',
                            }}
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
                                            {ad.Name} {/* Récupérer dynamiquement le nom */}
                                        </Typography>

                                        {/* Bouton cœur */}
                                        <IconButton
                                            onClick={() => handleHeartClick(index)}
                                            sx={{
                                                padding: 0,
                                                '&:focus': {
                                                    outline: 'none',
                                                },
                                                '&:active': {
                                                    outline: 'none',
                                                },
                                                '& .MuiTouchRipple-root': {
                                                    display: 'none',
                                                },
                                            }}
                                            disableRipple
                                            disableFocusRipple
                                        >
                                            {likedItems[index] ? (
                                                <Favorite sx={{ color: 'red' }} />
                                            ) : (
                                                <FavoriteBorder sx={{ color: '#9b59b6' }} />
                                            )}
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" color="gray">
                                        {ad.Place} {/* Récupérer dynamiquement le lieu */}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        {ad.Description} {/* Récupérer dynamiquement la description */}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        Posté le {new Date(ad.DatePost).toLocaleDateString()} {/* Formatage de la date de publication */}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        Aucun r&#233;sultat trouv&#233;.
                    </Typography>
                )}
            </Box>
        </Grid>
    );
}