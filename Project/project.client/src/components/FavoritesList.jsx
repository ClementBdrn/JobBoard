import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid, CardActionArea } from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function FavoritesList({ favoriteItems, likedItems, handleHeartClick, onAdSelect }) {
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
                paddingLeft: '5px',
                paddingTop: '5px',
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
                {/* Afficher seulement les annonces dans favoriteItems */}
                {favoriteItems.length > 0 ? (
                    favoriteItems.map((item, index) => (
                        <Card
                            key={item.id}
                            sx={{
                                backgroundColor: 'black',
                                border: '1px solid #AC5FE9',
                                marginBottom: 2,
                                borderRadius: '10px',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(172, 95, 233, 0.5)',
                                }
                            }}
                        >
                            <CardActionArea onClick={() => onAdSelect(item)}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
                                            {item.name}
                                        </Typography>
                                        {/* Bouton cœur */}
                                        <IconButton onClick={() => handleHeartClick(item.id)} sx={{ padding: 0 }}>
                                            <Favorite sx={{ color: likedItems[index] ? 'red' : 'gray' }} />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" color="gray">
                                        {item.company} {item.place}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        {item.datePost}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        Vous n'avez aucune annonce favorite.
                    </Typography>
                )}
            </Box>
        </Grid>
    );
}
