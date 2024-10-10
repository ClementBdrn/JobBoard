import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Person } from '@mui/icons-material';

export default function SearchBar() {

    const [search, setSearch] = useState('');

    const submitSearch = () => {
        // faire envoi de données
    }

    return (
        <Box sx={{ margin: 'auto', width: '60%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #AC5FE9',
                    borderRadius: '10px',
                    padding: '5px',
                    height: '50px',
                    width: '100%'
                }}
            >
                <Search sx={{ color: '#AC5FE9' }} />
                <TextField
                    fullWidth
                    placeholder="Recherchez une offre, une entreprise, un job..."
                    InputProps={{
                        style: { color: 'white', padding: '5px', height: '40px' }
                    }}
                    sx={{
                        backgroundColor: 'black',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#AC5FE9',
                        '&:hover': { backgroundColor: '#8e44ad' },
                        height: '50px',
                        position: 'relative',
                        left: '7px'
                    }}
                    onClick={submitSearch}
                >
                    Rechercher
                </Button>
            </Box>
        </Box>
    )
}