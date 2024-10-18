import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminJobs from '../components/AdminJobs';
import AdminCompanies from '../components/AdminCompanies';

export default function Admin() {
    const [activeComponent, setActiveComponent] = useState('jobs');

    return (
        <Box sx={{ padding: '2rem', borderRadius: '10px', backgroundColor: '#1C1C1E', overflow: 'hidden' }}>
            {/* Boutons de navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
                <Button
                    variant={activeComponent === 'jobs' ? 'contained' : 'outlined'}
                    sx={{ backgroundColor: activeComponent === 'jobs' ? '#7209B7' : undefined, color: 'white' }}
                    onClick={() => setActiveComponent('jobs')}
                >
                    Gestion des Jobs
                </Button>
                <Button
                    variant={activeComponent === 'companies' ? 'contained' : 'outlined'}
                    sx={{ backgroundColor: activeComponent === 'companies' ? '#7209B7' : undefined, color: 'white' }}
                    onClick={() => setActiveComponent('companies')}
                >
                    Gestion des Entreprises
                </Button>
            </Box>

            {/* Affichage dynamique du composant */}
            {activeComponent === 'jobs' ? <AdminJobs /> : <AdminCompanies />}
        </Box>
    );
}
