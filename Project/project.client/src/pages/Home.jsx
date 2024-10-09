import React from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Search, Person  } from '@mui/icons-material';

export default function Home() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '83vw', height: '100vh', backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    HOME
                </Typography>

                {/* Barre de recherche */}
                <Box sx={{ margin: 'auto', width: '60%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '2px solid #AC5FE9',
                            borderRadius: '10px',
                            padding: '5px',
                            height: '50px',
                            width: '100%'
                        }}
                    >
                        <Search sx={{ color: '#AC5FE9' }} />
                        <TextField
                            fullWidth
                            placeholder="Recherchez une offre, une entreprise, un job..."
                            InputProps={{
                                style: { color: 'white', padding: '5px', height: '40px' }
                            }}
                            sx={{
                                backgroundColor: 'black',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#AC5FE9',
                                '&:hover': { backgroundColor: '#8e44ad' },
                                height: '50px',
                                position: 'relative',
                                left: '7px'
                            }}
                        >
                            Rechercher
                        </Button>
                    </Box>
                </Box>

                <Person sx={{ color: '#AC5FE9', marginLeft: 2 }} />
            </Box>

            {/* Corps de la page */}
            <Grid container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                {/* Colonne gauche : Liste des offres avec scroll */}
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
                                        <Typography variant="h6" fontWeight="bold" color="white">
                                            Nettoyeur de voiture (H/F)
                                        </Typography>
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

                {/* Colonne droite : Détail de l'offre */}
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
                        <Typography variant="h5" fontWeight="bold">
                            Nettoyeur de voiture (H/F)
                        </Typography>
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
            </Grid>

            {/* Footer */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                }}
            >
            </Box>
        </Box>
    );
}
