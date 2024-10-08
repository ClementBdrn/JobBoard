import React from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';

export default function SignUp() {
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
                    Inscription
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Cr&#233;ez un compte ou connectez-vous.
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
                    <TextField
                        fullWidth
                        label="Entrez &#224; nouveau votre mot de passe"
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
                    <Button
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
                    >
                        Valider les informations
                    </Button>
                </Box>

                <Link href="signin" variant="body2" color="primary" sx={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}>
                    D&#233;j&#224; un compte ? Connection
                </Link>
            </Container>

            {/* Footer */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '6%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                }}
            >
                <Typography variant="caption">© 2024 Ch&#244;mage</Typography>
            </Box>
        </Box>
    );
}
