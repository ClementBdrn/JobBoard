import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm() {
    const navigate = useNavigate();

    //Email
    const [username, setUsername] = useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    //Password
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidate = true;
        if (username.length == 0 || password.length == 0) {
            toast.error("Tous les champs doivent \u00eatre renseign\u00e9s.");
            isValidate = false
        }

        if (isValidate) {
            try {
                const response = await fetch("https://localhost:7007/api/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                if (response.ok) {
                    const data = await response.json();
                    const idPeople = data.idPeople;
                    // Redirection vers la page d'accueil
                    navigate('/home', { state: { idPeople }});
                }
                else {
                    const errorData = await response.json();

                    errorData.errors.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
            }
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1e1E1E',
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
                        label="Username"
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
                        value={username}
                        onChange={handleUsernameChange}
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
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Typography sx={{ color: '#9b59b6', cursor: 'pointer' }} gutterBottom onClick={handleSignUp}>
                        Vous n'avez pas de compte ? Inscription.
                    </Typography>
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
            <ToastContainer />

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
                <Typography variant="caption">&#169; 2024 Ch&#244;mage</Typography>
            </Box >
        </Box >
    );
}
