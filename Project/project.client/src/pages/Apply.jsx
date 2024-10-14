import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApplyForm from '../components/ApplyForm';
import { useVerificationToken } from '../hooks/useVerificationToken';

export default function Apply() {
    useVerificationToken();

    return (
        <ApplyForm />
    )
}