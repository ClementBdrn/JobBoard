import React from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Person } from '@mui/icons-material';
export default function JobList() {
    return (
        <Grid
            item
            xs={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '86vh',
                overflowY: 'auto',
                paddingRight: '10px',
                marginTop: '0',
                minWidth: '30vw',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#1c1c1c',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#AC5FE9',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#8e44ad',
                },
            }}
        >
            <Box>
                {Array(15).fill().map((_, index) => (
                    <Card
                        key={index}
                        sx={{
                            backgroundColor: 'black',
                            border: '1px solid #AC5FE9',
                            marginBottom: 2,
                            borderRadius: '10px'
                        }}
                    >
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" color="white">
                                    Nettoyeur de voiture (H/F)
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    Lav'auto (66)
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    Nous sommes une entreprise de nettoyage situ&#233;e sur Perpignan et...
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    il y a 30 jours...
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Grid>
    )
}