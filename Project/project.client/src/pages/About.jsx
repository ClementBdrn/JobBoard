import React from 'react';
import SideNav from '../component/SideNav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function About() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>About</h1>
                </Box>
            </Box>
        </>
    )
}