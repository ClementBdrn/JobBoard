import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ApplyForm() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Redirection vers la page d'accueil
        navigate('/');
    };

    // &#233;tat pour les informations de formulaire
    const [firstname, setFirstname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState('');

    // Gestion des changements dans l'input fichier
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);  // On met à jour avec le nom du fichier s&#233;lectionn&#233;
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
                    <Box>
                        <TextField
                            fullWidth
                            label="Fichier s&#233;lectionn&#233;"
                            value={selectedFile}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ marginBottom: 2 }}
                        />

                        {/* Bouton pour s&#233;lectionner un fichier */}
                        <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
                            Choisir un fichier
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
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
                    >
                        Soumettre
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
