import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, Grid, Box } from '@mui/material';

export default function AdminCompanies() {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({ name: '', place: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/companies');
                if (response.ok) {
                    const data = await response.json();
                    setCompanies(data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des entreprises:', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleAddCompany = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await handleUpdateCompany();
        } else {
            try {
                const response = await fetch('https://localhost:7007/api/companies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: newCompany.name,
                        place: newCompany.place,
                        description: newCompany.description
                    })
                });

                if (response.ok) {
                    const newId = await response.json();
                    setCompanies([...companies, { ...newCompany, id: newId+1 }]);
                    setNewCompany({ name: '', place: '', description: '' });
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'entreprise:", error);
            }
        }
    };

    const handleUpdateCompany = async () => {
        try {
            const response = await fetch(`https://localhost:7007/api/companies/${newCompany.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: newCompany.id,
                    name: newCompany.name,
                    place: newCompany.place,
                    description: newCompany.description
                })
            });

            if (response.ok) {
                setCompanies(companies.map(company => company.id === newCompany.id ? newCompany : company));
                setIsEditing(false);
                setNewCompany({ id: null, name: '', place: '', description: '' });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du job :", error);
        }
    };

    const handleEditCompany = (company) => {
        setNewCompany({id: company.id, name: company.name, place: company.place, description: company.description});
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewCompany({ id: null, name: '', place: '', description: '' });
    };

    const handleDeleteCompany = async (id) => {
        try {
            const response = await fetch(`https://localhost:7007/api/companies/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setCompanies(companies.filter(company => company.id !== id));
            } else {
                console.error("Échec de la suppression.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'entreprise :", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#2C2C2E', color: 'white', padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                ADMINISTRATION ENTREPRISES
            </Typography>

            {/* Formulaire d'ajout/modification des entreprises */}
            <Box component="form" onSubmit={handleAddCompany} sx={{ mt: 3, width: '77vw', maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Ajouter une Entreprise</Typography>
                <TextField
                    label="Nom de l'entreprise"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    required
                />
                <TextField
                    label="Localisation"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newCompany.place}
                    onChange={(e) => setNewCompany({ ...newCompany, place: e.target.value })}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newCompany.description}
                    onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ backgroundColor: '#7209B7', color: 'white' }}
                    >
                        {isEditing ? 'Modifier' : 'Ajouter'}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#7209B7', color: 'white', marginLeft: 2 }}
                            onClick={handleCancelEdit}
                        >
                            Annuler
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Liste des entreprises */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Liste des Entreprises</Typography>
                <Grid container spacing={2}>
                    {companies.map((company) => (
                        <Grid item xs={12} md={6} key={company.id}>
                            <Card sx={{ backgroundColor: '#444', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">{company.name}</Typography>
                                    <Typography variant="body2">{company.place}</Typography>
                                    <Typography sx={{ mt: 1.5 }}>{company.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        sx={{ color: 'white', backgroundColor: '#E63946' }}
                                        onClick={() => handleDeleteCompany(company.id)}
                                    >
                                        Supprimer
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{ color: 'white', backgroundColor: '#7209B7' }}
                                        onClick={() => handleEditCompany(company)}
                                    >
                                        Modifier
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
