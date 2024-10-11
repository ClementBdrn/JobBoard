import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Person, Favorite, FavoriteBorder } from '@mui/icons-material';

export default function JobDetails({idPeople}) {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/apply');
    };

    const [liked, setLiked] = useState(false);

    const handleHeartClick = () => {
        setLiked(!liked);
    };

    return (
        <Grid
            item
            xs={6}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: '0',
            }}
        >
            <Box
                sx={{
                    border: '1px solid #AC5FE9',
                    borderRadius: '10px',
                    padding: 3,
                    height: '83vh',
                    overflowY: 'auto',
                    marginLeft: 'auto',
                }}
            >
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h5" fontWeight="bold">
                    Nettoyeur de voiture (H/F)
                </Typography>
                    <IconButton onClick={() => handleHeartClick()} sx={{
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
                }} disableRipple disableFocusRipple>
                    {liked ? (
                        <Favorite sx={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorder sx={{ color: '#9b59b6' }} />
                    )}
                </IconButton>
            </Box>
                <Typography variant="body2" color="gray">
                    Lav'auto (66)
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#AC5FE9',
                        '&:hover': { backgroundColor: '#8e44ad' },
                        marginTop: 2,
                    }}
                    onClick={handleSubmit}
                >
                    Postulez spontan&#233;ment
                </Button>

                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Type de poste: CDI
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                    Situ&#233; sur Perpignan 66000
                </Typography>

                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Description:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions...
                </Typography>

                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Comp&#233;tences requises:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    Il vous faudra des comp&#233;tences dans la manipulation de l'eau et de l'&#233;ponge.
                </Typography>
            </Box>
        </Grid>
    )
}