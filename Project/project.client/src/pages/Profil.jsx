import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProfilComponent from '../components/ProfilComponent';

export default function Profil({ idPeople }) {
    return (
        <ProfilComponent idPeople={idPeople} />
    )
}