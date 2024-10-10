import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Person, Favorite, FavoriteBorder } from '@mui/icons-material';
export default function JobList() {

    const [likedItems, setLikedItems] = useState(Array(15).fill(false));

    const handleHeartClick = (index) => {
        const updatedLikes = [...likedItems];
        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);
    };

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
                {Array(15).fill().map((_, index) => (
                    <Card
                        key={index}
                        sx={{
                            backgroundColor: 'black',
                            border: '1px solid #AC5FE9',
                            marginBottom: 2,
                            borderRadius: '10px'
                        }}
                    >
                        <CardActionArea>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
                                        Nettoyeur de voiture (H/F)
                                    </Typography>

                                    {/* Bouton cœur */}
                                    <IconButton onClick={() => handleHeartClick(index)} sx={{ padding: 0 }}>
                                        {likedItems[index] ? (
                                            <Favorite sx={{ color: 'red' }} />
                                        ) : (
                                            <FavoriteBorder sx={{ color: '#9b59b6' }} />
                                        )}
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="gray">
                                    Lav'auto (66)
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    Nous sommes une entreprise de nettoyage situ&#233;e sur Perpignan et...
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    il y a 30 jours...
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Grid>
    )
}