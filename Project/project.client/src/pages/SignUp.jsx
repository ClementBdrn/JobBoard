import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// INSCRIPTION
export default function SignUp() {
    //Email
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    //Password 1
    const [password1, setPassword1] = useState("");

    const handlePassword1Change = (e) => {
        setPassword1(e.target.value);
    }

    //Password 2
    const [password2, setPassword2] = useState("");

    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
    }

    // Envoi les values au back
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            toast.error("Les deux mots de passe doivent \u00EAtre identiques.");
        }

        if (email.length == 0 || password1.length == 0 || password2.length == 0) {
            toast.error("Les trois champs doivent \u00EAtre renseign\u00e9s.");
        }

        try {
            const response = await fetch("https://localhost:7007/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password1, password2 }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Données reçues du backend :", data);
            } else {
                console.error("Erreur lors de l'envoi du mot de passe.");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
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
                        value={email}
                        onChange={handleEmailChange}
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
                        value={password1}
                        onChange={handlePassword1Change}
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
                        value={password2}
                        onChange={handlePassword2Change}
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
                        onClick={handleSubmit}
                    >
                        Valider les informations
                    </Button>
                </Box>
                <ToastContainer />

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
