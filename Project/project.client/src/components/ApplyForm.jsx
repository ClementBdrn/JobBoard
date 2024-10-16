import React, { useState, useContext, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

export default function ApplyForm() {
    const navigate = useNavigate();
    const { idPeople } = useContext(AppContext);

    // &#233;tat pour les informations de formulaire
    const [user, setUser] = useState({ firstname: '', name: '', phone: '', email: '', address: '' });
    const [selectedCV, setSelectedCV] = useState('');
    const [selectedLM, setSelectedLM] = useState('');
    const [loading, setLoading] = useState(true); // &#233;tat pour le chargement

    // Fonction pour r&#233;cup&#233;rer les informations de l'utilisateur
    const getInfos = async () => {
        try {
            const response = await fetch("https://localhost:7007/api/Profil", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idPeople }),
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                console.log(userData.firstname);
                setUser({
                    firstname: userData.firstName,
                    name: userData.lastName,
                    phone: userData.phone,
                    email: userData.email,
                    address: '',
                });
                console.log(user);
            }
        }
        catch (error) {
            console.log("Erreur lors du chargement du profil.");
        }
        finally {
            setLoading(false); // Arrête le chargement, même si une erreur se produit
        }
    };

    // Appel de getInfos lors du premier rendu du composant
    useEffect(() => {
        getInfos();
    }, [idPeople]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValidate = true;

        if (!selectedCV) {
            toast.error("Veuillez d&#233;poser votre CV.");
            isValidate = false;
        }

        if (!selectedLM) {
            toast.error("Veuillez d&#233;poser votre lettre de motivation.");
            isValidate = false;
        }

        if (isValidate) {
            try {
                const response = await fetch("https://localhost:7007/api/applyForm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...user, selectedCV, selectedLM }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Donn&#233;es reçues du backend :", data);
                    navigate('/home');
                } else {
                    const errorData = await response.json();
                    errorData.errors.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
            } catch (error) {
                console.error("Erreur r&#233;seau :", error);
            }
        }
    };

    // Gestion des changements dans l'input fichier
    const handleCVChange = (event) => {
        const file = event.target.files[0];
        setSelectedCV(file ? file.name : '');
    };

    const handleLMChange = (event) => {
        const file = event.target.files[0];
        setSelectedLM(file ? file.name : '');
    };

    if (loading) {
        return <Typography>Chargement...</Typography>; // Indicateur de chargement
    }

    return (
        <Box
            sx={{
                width: '83vw',
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
                    SOS CHÔMAGE
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
                        InputProps={{
                            readOnly: true,
                            style: { borderColor: '#9b59b6', color: 'white' }
                        }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={user.firstname}
                    />
                    <TextField
                        fullWidth
                        label="Nom"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            readOnly: true,
                            style: { borderColor: '#9b59b6', color: 'white' }
                        }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={user.name}
                    />
                    <TextField
                        fullWidth
                        label="Adresse E-mail"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            readOnly: true,
                            style: { borderColor: '#9b59b6', color: 'white' }
                        }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={user.email}
                    />
                    <TextField
                        fullWidth
                        label="Ville, r&#233;gion"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            readOnly: true,
                            style: { borderColor: '#9b59b6', color: 'white' }
                        }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={user.address}
                    />
                    <TextField
                        fullWidth
                        label="T&#233;l&#233;phone"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            readOnly: true,
                            style: { borderColor: '#9b59b6', color: 'white' }
                        }}
                        sx={{
                            '& fieldset': {
                                borderColor: '#9b59b6',
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: '#9b59b6',
                            },
                        }}
                        value={user.phone}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
                            D&#233;posez votre CV
                            <input type="file" hidden onChange={handleCVChange} accept="application/pdf" />
                        </Button>
                        <Typography variant="body2" align="left" gutterBottom>
                            {selectedCV}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
                            D&#233;posez votre LM
                            <input type="file" hidden onChange={handleLMChange} accept="application/pdf" />
                        </Button>
                        <Typography variant="body2" align="left" gutterBottom>
                            {selectedLM}
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!selectedCV || !selectedLM}
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