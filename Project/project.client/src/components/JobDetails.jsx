import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function JobDetails({ selectedAd }) {
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/apply', { state: { selectedAd } })
    }

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
                </Box>
                <Typography variant="body2" color="gray">
                    {selectedAd.companyName}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#AC5FE9',
                        '&:hover': { backgroundColor: '#8e44ad' },
                        height: '50px',
                        position: 'relative',
                        left: '7px'
                    }}
                    onClick={redirect}
                >
                    POSTULER
                </Button>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Type de poste: {selectedAd.contract} {/* Remplacez par le type dynamique */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                    Situ&eacute; sur: {selectedAd.place} {/* Remplacez par l'emplacement dynamique */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Description:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    {selectedAd.description} {/* Affichage dynamique de la description */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Comp&eacute;tences requises:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    {selectedAd.skills} {/* Remplacez par les comp&#233;tences dynamiques */}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
                    Salaire:
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 2 }}>
                    {selectedAd.salary} {/* Remplacez par les comp�tences dynamiques */}
                </Typography>
            </Box>
        </Grid>
    );
}
