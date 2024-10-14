import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm() {
    const navigate = useNavigate();

    //Nom Complet
    const [name, setName] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    //Username
    const [username, setUsername] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const [birthDate, setBirthDate] = useState("");

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    }

    //Phone
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

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

        let isValidate = true;
        if (name.length == 0 || username.length == 0 || birthDate.length == 0 || phone.length == 0 || email.length == 0 || password1.length == 0 || password2.length == 0) {
            toast.error("Tous les champs doivent \u00eatre renseign\u00e9s.");
            isValidate = false
        }

        if (isValidate) {
            try {
                const response = await fetch("https://localhost:7007/api/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, username, birthDate, phone, email, password1, password2 }),
                });
                if (response.ok) {
                    const data = await response.json();
                    const idPeople = data.idPeople;

                    // Redirection vers la page d'accueil
                    navigate('/home', { state: {idPeople}});
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
                    Inscription
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Cr&#233;ez un compte ou connectez-vous.
                </Typography>

                {/* Formulaire */}
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Nom Complet"
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
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        fullWidth
                        label="Pseudo"
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
                        label="Date de naissance"
                        variant="outlined"
                        type="date"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        InputProps={{ style: { borderColor: '#9b59b6', color: 'white' } }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={birthDate}
                        onChange={handleBirthDateChange}
                    />
                    <TextField
                        fullWidth
                        label="T&#233;l&#233;phone"
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
                        value={phone}
                        onChange={handlePhoneChange}
                    />
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
                        label="Confirmez votre mot de passe"
                        variant="outlined"
                        type = "password"
                        margin = "normal"
                        InputLabelProps = {{ style: { color: 'white' } }}
                        InputProps = {{ style: { borderColor: '#9b59b6', color: 'white' } }}
                        sx = {{
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
                        < Button
                            fullWidth
                            variant = "contained"
                            color = "primary"
                            sx = {{
                                backgroundColor: '#9b59b6',
                                    marginTop: '1rem',
                                        '&:hover': {
                                    backgroundColor: '#8e44ad',
                                                        },
                            }}
                            onClick = { handleSubmit }
                                >
                                Se connecter
                        </Button >
                </Box >
                <ToastContainer />
                </Container >

                {/* Footer */ }
                < Box
                    sx = {{
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
