import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';

export default function UserProfileStatic() {
    const location = useLocation();
    const { user } = location.state.user || {};

    if (!user) {
        return (
            <Box
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '10px',
                    height: '100vh',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>Les données de l'utilisateur sont introuvables.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20%',
            }}
        >
            <Card
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    mt: 2,
                    border: '4px solid #AC5FE9',
                }}
            >
                <CardContent>
                    <Typography variant="h4" gutterBottom> Profil de {user.firstName}</Typography>

                    <Grid container spacing={5}>
                        {/* Prénom */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Pr&#233;nom</Typography>
                            <Typography>{user.firstName}</Typography>
                        </Grid>

                        {/* Nom de famille */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Nom</Typography>
                            <Typography>{user.lastName}</Typography>
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Email</Typography>
                            <Typography>{user.email}</Typography>
                        </Grid>

                        {/* Téléphone */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">T&#233;l&#233;phone</Typography>
                            <Typography>{user.phone}</Typography>
                        </Grid>

                        {/* Date de naissance */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Date de naissance</Typography>
                            <Typography>{new Date(user.birthDate).toLocaleDateString('fr-FR')}</Typography>
                        </Grid>

                        {/* Employé actuellement */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Employ&#233; actuellement</Typography>
                            <Typography>{user.isEmployed ? 'Oui' : 'Non'}</Typography>
                        </Grid>

                        {/* Identifiants des entreprises */}
                        {user.isemployed ? 
                            <Grid item xs={12}>
                                <Typography variant="h6">Identifiants de l'entreprise</Typography>
                                <Typography>{user.idCompanies.join(', ')}</Typography>
                            </Grid>
                        : ''}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
