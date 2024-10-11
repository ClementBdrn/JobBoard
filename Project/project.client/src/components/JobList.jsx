import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, CardActionArea, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function JobList({idPeople}) {
    // �tat pour les annonces
    const [advertisements, setAdvertisements] = useState([]);
    // �tat pour les likes
    const [likedItems, setLikedItems] = useState([]);

    // Fonction pour g�rer le clic sur le c�ur
    const handleHeartClick = (index) => {
        const updatedLikes = [...likedItems];
        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);

        const ad = advertisements[index];
        if (updatedLikes[index]) {
            try {
                const response = await fetch('https://localhost:7007/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: idPeople, // Envoyer l'ID de l'utilisateur
                        adId: ad.id, // Envoyer l'ID de l'annonce
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout aux favoris');
                }

                // Optionnel : Traitez la r�ponse si n�cessaire
                const result = await response.json();
                console.log('Favori ajout� :', result);
            }
            catch (error) {
                console.error("Erreur lors de l'ajout aux favoris :", error);
            }
        }
    };

    // R�cup�rer les annonces depuis l'API
    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/advertisements');
                const data = await response.json();
                setAdvertisements(data);
                setLikedItems(Array(data.length).fill(false));
            } catch (error) {
                console.error("Erreur lors de la r�cup�ration des annonces :", error);
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
                {/* Affichage dynamique des annonces r�cup�r�es */}
                {advertisements.length > 0 ? (
                    advertisements.map((ad, index) => (
                        <Card
                            key={ad.id} // Utilisez un identifiant unique
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
                                            {ad.title} {/* R�cup�rer dynamiquement le titre */}
                                        </Typography>

                                        {/* Bouton c�ur */}
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
                                        {ad.company} ({ad.location}) {/* R�cup�rer dynamiquement l'entreprise et l'emplacement */}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        {ad.description} {/* R�cup�rer dynamiquement la description */}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        Post� il y a {ad.postedDate} jours {/* R�cup�rer dynamiquement la date de publication */}
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