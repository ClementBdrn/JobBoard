import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, Grid, Box } from '@mui/material';

export default function UserProfileStatic() {
    // Données utilisateur statiques
    const user = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+33 6 12 34 56 78',
        birthdate: '15/10/1990',
        isemployed: true,
        idcompanies: [1, 3, 5] // Par exemple, les IDs des entreprises où l'utilisateur a travaillé
    };

    return (
        <Box sx={{ backgroundColor: 'black', color: 'white', padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h4" gutterBottom>Profil de l'utilisateur</Typography>

            <Card sx={{ backgroundColor: 'black', color: 'white', mt: 2, border: '1px solid #AC5FE9' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* Prénom */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Pr&#233;nom</Typography>
                            <Typography>{user.firstname}</Typography>
                        </Grid>

                        {/* Nom de famille */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Nom</Typography>
                            <Typography>{user.lastname}</Typography>
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
                            <Typography>{user.birthdate}</Typography>
                        </Grid>

                        {/* Employé actuellement */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Employ&#233; actuellement</Typography>
                            <Typography>{user.isemployed ? 'Oui' : 'Non'}</Typography>
                        </Grid>

                        {/* Identifiants des entreprises */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Identifiants des entreprises</Typography>
                            <Typography>{user.idcompanies.join(', ')}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
