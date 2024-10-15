import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function JobDetails({ selectedAd }) {
    const [liked, setLiked] = React.useState(false);

    const handleHeartClick = () => {
        setLiked(!liked);
    };

    if (!selectedAd) {
        return (
            <Grid item xs={6} sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ color: 'gray' }}>
                    Veuillez s&#233;lectionner une annonce pour voir les d&#233;tails.
                </Typography>
            </Grid>
        );
    }

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
                    backgroundColor: 'black',
                    width: '100%'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
                        {selectedAd.name}
                    </Typography>
                    <IconButton onClick={handleHeartClick} sx={{
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
                    {selectedAd.idCompanies}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Type de poste: {selectedAd.contract} {/* Remplacez par le type dynamique */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                    Situ&#233; sur: {selectedAd.place} {/* Remplacez par l'emplacement dynamique */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Description:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    {selectedAd.description} {/* Affichage dynamique de la description */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Comp&#233;tences requises:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    {selectedAd.skills} {/* Remplacez par les comp&#233;tences dynamiques */}
                </Typography>
            </Box>
        </Grid>
    );
}
