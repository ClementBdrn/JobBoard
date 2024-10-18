import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, Grid, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function AdminJobs() {
    // State pour les jobs
    const [jobs, setJobs] = useState([]);

    // State pour les entreprises
    const [companies, setCompanies] = useState([]);

    // State pour ajouter un nouveau job
    const [newJob, setNewJob] = useState({ title: '', companyId: '', contrat: '', location: '', description: '', salaire: '', skills: '' });

    // Indicateur pour savoir si on modifie un job
    const [isEditing, setIsEditing] = useState(false);

    // Récupérer les entreprises depuis l'API (au chargement du composant)
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

        const fetchJobs = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/advertisements');
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    console.error("Erreur lors de la récupération des annonces");
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        };

        fetchJobs();
    }, []);

    // Fonction pour ajouter un job (statique, sans interaction avec un backend)
    const handleAddJob = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await handleUpdateJob();
        } else {
            try {
                const response = await fetch('https://localhost:7007/api/advertisements', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: newJob.title,
                        place: newJob.location,
                        contract: newJob.contrat,
                        description: newJob.description,
                        skills: newJob.skills,
                        datePost: new Date().toISOString(),
                        idCompanies: newJob.companyId,
                        salary: newJob.salaire
                    })
                });


                if (response.ok) {
                    const newId = await response.json();
                    setJobs([...jobs, { ...newJob, id: newId + 1 }]);
                    setNewJob({ title: '', companyId: '', contrat: '', location: '', description: '', salaire: '', skills: '' });
                }
            }
            catch (error) {
                console.error("Erreur lors de la récupération des favoris :", error);
            }
        }
    };

    // Fonction pour mettre à jour un job
    const handleUpdateJob = async () => {
        try {
            const response = await fetch(`https://localhost:7007/api/advertisements/${newJob.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newJob.title,
                    place: newJob.location,
                    contract: newJob.contrat,
                    description: newJob.description,
                    skills: newJob.skills,
                    datePost: new Date().toISOString(),
                    idCompanies: newJob.companyId,
                    salary: newJob.salaire
                })
            });

            if (response.ok) {
                setJobs(jobs.map(job => job.id === newJob.id ? newJob : job));
                setIsEditing(false);
                setNewJob({ id: null, title: '', company: '', location: '', description: '', salaire: '', skills: '' });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du job :", error);
        }
    };

    // Remplir le formulaire avec les données du job sélectionné pour modification
    const handleEditJob = (job) => {
        setNewJob({ id: job.id, title: job.name, companyId: job.idCompanies, location: job.place, description: job.description, salaire: job.salary, skills: job.skills, contrat: job.contract });
        setIsEditing(true);
    };

    // Fonction pour annuler la modification
    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewJob({ id: null, title: '', companyId: '', location: '', description: '', salaire: '', contrat: '', skills: '' });
    };

    // Fonction pour supprimer un job
    const handleDeleteJob = async (id) => {
        try {
            const response = await fetch(`https://localhost:7007/api/advertisements/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setJobs(jobs.filter(job => job.id !== id));
            } else {
                console.error("Échec de la suppression.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du job :", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#2C2C2E', color: 'white', padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                ADMINISTRATION JOBS
            </Typography>

            {/* Formulaire pour ajouter un job */}
            <Box component="form" onSubmit={handleAddJob} sx={{ mt: 3, width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Ajouter un Job</Typography>
                <TextField
                    label="Titre du job"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                />
                {/* Liste déroulante pour sélectionner l'entreprise */}
                <FormControl fullWidth margin="normal" sx={{ backgroundColor: '#333' }}>
                    <InputLabel sx={{ color: 'white' }}>Entreprise</InputLabel>
                    <Select
                        value={newJob.companyId}
                        onChange={(e) => setNewJob({ ...newJob, companyId: e.target.value })}
                        label="Entreprise"
                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                        required
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ backgroundColor: '#333' }}>
                    <InputLabel sx={{ color: 'white' }}>Contrat</InputLabel>
                    <Select
                        value={newJob.contrat}
                        onChange={(e) => setNewJob({ ...newJob, contrat: e.target.value })}
                        label="Contrat"
                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                        required
                    >
                        <MenuItem key='CDI' value='CDI'>
                            CDI
                        </MenuItem>
                        <MenuItem key='CDD' value='CDD'>
                            CDD
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Lieu"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    required
                />
                <TextField
                    label="Compétences"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newJob.skills}
                    onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
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
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    required
                />
                <TextField
                    label="Salaire"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newJob.salaire}
                    onChange={(e) => setNewJob({ ...newJob, salaire: e.target.value })}
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

            {/* Liste des jobs */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Liste des Jobs</Typography>
                <Grid container spacing={2}>
                    {jobs.map((job) => (
                        <Grid item xs={12} md={6} key={job.id}>
                            <Card sx={{ backgroundColor: '#444', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {job.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {job.companyName || 'Entreprise inconnue'} - {job.place}
                                    </Typography>
                                    <Typography sx={{ mt: 1.5 }}>
                                        {job.description}
                                    </Typography>
                                    <Typography sx={{ mt: 1.5 }}>
                                        {job.skills}
                                    </Typography>
                                    <Typography sx={{ mt: 1.5 }}>
                                        {job.salaire}
                                    </Typography>
                                    <Typography sx={{ mt: 1.5 }}>
                                        {job.contrat}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        Post&eacute; le : {new Date(job.datePost).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        sx={{ color: 'white', backgroundColor: '#E63946' }}
                                        onClick={() => handleDeleteJob(job.id)}
                                    >
                                        Supprimer
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{ color: 'white', backgroundColor: '#7209B7' }}
                                        onClick={() => handleEditJob(job)}
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
};
