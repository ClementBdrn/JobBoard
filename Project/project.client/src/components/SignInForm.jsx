import React from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Redirection vers la page d'accueil
        navigate('/');
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    border: '2px solid #9b59b6',
                    borderRadius: '10px',
                    padding: '2rem',
                    backgroundColor: 'black',
                    color: 'white',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    SOS CH&#212;MAGE
                </Typography>

                <Typography variant="h5" align="left" gutterBottom>
                    Connection
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Connectez-vous.
                </Typography>

                {/* Formulaire */}
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Adresse E-mail"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { borderColor: '#9b59b6', color: 'white' } }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { borderColor: '#9b59b6', color: 'white' } }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                    />
                    < Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#9b59b6',
                            marginTop: '1rem',
                            '&:hover': {
                                backgroundColor: '#8e44ad',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Se connecter
                    </Button >
                </Box >
            </Container >

            {/* Footer */}
            < Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '6%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                }}
            >
                <Typography variant="caption">  2024 Ch&#244;mage</Typography>
            </Box >
        </Box >
    );
}
