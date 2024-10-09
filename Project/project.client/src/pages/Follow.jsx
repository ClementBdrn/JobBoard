import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Setting() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'background.default' }}>
            <Typography variant="h2" color="primary">
                Suivez-nous
            </Typography>
        </Box>
    )
}