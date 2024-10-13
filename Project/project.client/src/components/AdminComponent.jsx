import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, Grid, Box } from '@mui/material';

const AdminStatic = () => {
    // Liste statique de jobs pour l'affichage
    const initialJobs = [
        { id: 1, title: 'Nettoyeur de voiture (H/F)', company: 'Lav\'auto', location: 'Perpignan 66000', description: 'Nous sommes une entreprise de nettoyage située sur Perpignan...' },
        { id: 2, title: 'Développeur Full-Stack', company: 'TechCorp', location: 'Paris', description: 'Développer des applications web en utilisant React et Node.js.' },
        { id: 3, title: 'Designer UX/UI', company: 'Creativ', location: 'Lyon', description: 'Créer des interfaces utilisateur intuitives et attrayantes.' }
    ];

    // State pour les jobs
    const [jobs, setJobs] = useState(initialJobs);

    // State pour ajouter un nouveau job
    const [newJob, setNewJob] = useState({ title: '', company: '', location: '', description: '' });

    // Fonction pour ajouter un job (statique, sans interaction avec un backend)
    const handleAddJob = (e) => {
        e.preventDefault();
        const newId = jobs.length ? jobs[jobs.length - 1].id + 1 : 1; // Générer un nouvel ID
        setJobs([...jobs, { ...newJob, id: newId }]);
        setNewJob({ title: '', company: '', location: '', description: '' });
    };

    // Fonction pour supprimer un job
    const handleDeleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    return (
        <Box sx={{ backgroundColor: '#2C2C2E', color: 'white', padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h4" gutterBottom>Administration</Typography>

            {/* Formulaire pour ajouter un job */}
            <Box component="form" onSubmit={handleAddJob} sx={{ mt: 3 }}>
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
                <TextField
                    label="Entreprise"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ backgroundColor: '#333' }}
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    required
                />
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
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2, backgroundColor: '#7209B7', color: 'white' }}
                >
                    Ajouter
                </Button>
            </Box>

            {/* Liste des jobs */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Liste des Jobs</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {jobs.map((job) => (
                        <Grid item xs={12} md={6} key={job.id}>
                            <Card sx={{ backgroundColor: '#444', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {job.company} - {job.location}
                                    </Typography>
                                    <Typography sx={{ mt: 1.5 }}>
                                        {job.description}
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
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminStatic;
