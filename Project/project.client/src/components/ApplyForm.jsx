import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function ApplyForm() {
    const navigate = useNavigate();

    // &#233;tat pour les informations de formulaire
    const [firstname, setFirstname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidate = true;

        if (selectedFile.length == 0) {
            toast.error("Veuiller choisir un fichier.");
            isValidate = false
        }

        if (firstname.length == 0 || name.length == 0 || phone.length == 0 || email.length == 0 || address.length == 0) {
            toast.error("Tous les champs doivent \u00eatre renseign\u00e9s.");
            isValidate = false
        }

        if (isValidate) {
            try {
                const response = await fetch("https://localhost:7007/api/applyForm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ firstname, name, phone, email, address, selectedFile }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Données reçues du backend :", data);

                    navigate('/');
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

    // Gestion des changements dans l'input fichier
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        } else {
            setSelectedFile('');
        }
    };

    return (
        <Box
            sx={{
                width: '83vw',
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
                    Candidatez
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Pour l'offre d'emploi: METTRE OFFRE
                </Typography>

                {/* Formulaire */}
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Pr&#233;nom"
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
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Nom"
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
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Ville, r&#233;gion"
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
                            Choisir un fichier
                            <input type="file" hidden onChange={handleFileChange} accept="application/pdf" />
                        </Button>
                        <Typography variant="body2" align="left" gutterBottom>
                            { selectedFile }
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!selectedFile}
                        sx={{
                            backgroundColor: '#9b59b6',
                            marginTop: '1rem',
                            '&:hover': {
                                backgroundColor: '#8e44ad',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Soumettre
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
