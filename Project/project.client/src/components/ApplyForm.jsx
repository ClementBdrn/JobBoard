import React, { useState, useContext, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

export default function ApplyForm() {
    const navigate = useNavigate();
    const { idPeople } = useContext(AppContext);
    const location = useLocation();
    const selectedAd = location.state.selectedAd || {};

    const [user, setUser] = useState({ firstname: '', name: '', phone: '', email: '' });
    const [selectedCV, setSelectedCV] = useState(null);
    const [selectedLM, setSelectedLM] = useState(null);
    const [cvFileName, setCVFileName] = useState('');
    const [lmFileName, setLMFileName] = useState('');
    const [loading, setLoading] = useState(true);

    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

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
                setUser({
                    firstname: userData.user.firstName,
                    name: userData.user.lastName,
                    phone: userData.user.phone,
                    email: userData.user.email,
                });
            }
        } catch (error) {
            console.log("Erreur lors du chargement du profil.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInfos();
    }, [idPeople]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCV || !selectedLM) {
            toast.error("Veuillez d&#233;poser votre CV et lettre de motivation.");
            return;
        }

        try {
            const selectedCVBase64 = await convertFileToBase64(selectedCV);
            const selectedLMBase64 = await convertFileToBase64(selectedLM);

            const payload = {
                apply: {
                    idPeople,
                    nameCV: cvFileName,
                    nameLM: lmFileName,
                    fileCV: selectedCVBase64,
                    fileLM: selectedLMBase64
                },
                advertisement: selectedAd
            };

            const response = await fetch("https://localhost:7007/api/applyForm/sendInfos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
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
    };

    const handleCVChange = (event) => {
        const file = event.target.files[0];
        setSelectedCV(file);
        setCVFileName(file ? file.name : '');
    };

    const handleLMChange = (event) => {
        const file = event.target.files[0];
        setSelectedLM(file);
        setLMFileName(file ? file.name : '');
    };

    if (loading) {
        return <Typography>Chargement...</Typography>;
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
                    SOS CH&#212;MAGE
                </Typography>

                <Typography variant="h5" align="left" gutterBottom>
                    Candidatez
                </Typography>

                <Typography variant="body1" align="left" gutterBottom>
                    Pour l'offre d'emploi: {selectedAd.name.toUpperCase()}
                </Typography>

                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Pr&#233;nom"
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
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
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
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
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
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
                            {cvFileName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" component="label" sx={{ marginRight: 2 }}>
                            D&#233;posez votre LM
                            <input type="file" hidden onChange={handleLMChange} accept="application/pdf" />
                        </Button>
                        <Typography variant="body2" align="left" gutterBottom>
                            {lmFileName}
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