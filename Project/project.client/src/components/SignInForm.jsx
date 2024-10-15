import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerificationTokenSignIn } from '../hooks/useVerificationTokenSignIn';
import { AppContext } from '../context/AppContext.jsx';

export default function SignInForm() {
    const { idPeople, setIdPeople } = useContext(AppContext);

    if (idPeople != 0) {
        navigate('/home');
    }
    useVerificationTokenSignIn();

    const navigate = useNavigate();

    //Email
    const [username, setUsername] = useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    //Password
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Loader state
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidate = true;
        if (username.length === 0 || password.length === 0) {
            toast.error("Tous les champs doivent �tre renseign�s.");
            isValidate = false;
        }

        if (isValidate) {
            setIsLoading(true);
            try {
                const response = await fetch("https://localhost:7007/api/SignIn/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setIdPeople(data.idPeople);
                    const token = data.token;

                    localStorage.setItem('token', token);

                    // Redirection vers la page d'accueil
                    navigate('/home');
                }
                else {
                    const errorData = await response.json();
                    errorData.errors.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
            } catch (error) {
                console.error("Erreur r�seau :", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

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
                    Connexion
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Connectez-vous.
                </Typography>

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

                    {/* Bouton de soumission */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading} // D�sactiver le bouton pendant le chargement
                        sx={{
                            backgroundColor: '#9b59b6',
                            marginTop: '1rem',
                            '&:hover': {
                                backgroundColor: '#8e44ad',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Se connecter"}
                    </Button>
                </Box>
            </Container>
            <ToastContainer />

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
                <Typography variant="caption">&#169; 2024 Ch&#212;mage</Typography>
            </Box>
        </Box>
    );
}
