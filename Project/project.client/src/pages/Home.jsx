import React from 'react';
import SideNav from '../components/SideNav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Home() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'background.default' }}>
            <Typography variant="h2" color="primary">
                Home
            </Typography>
        </Box>
    );
}