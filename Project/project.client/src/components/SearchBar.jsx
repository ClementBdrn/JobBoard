import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchBar({ onSearch }) {
    const [search, setSearch] = useState('');

    const submitSearch = async () => {
        try {
            const searchTerm = search.trim();
            let response = "";

            if (searchTerm == "") {
                response = await fetch('https://localhost:7007/api/advertisements');
            }
            else {
                response = await fetch(`https://localhost:7007/api/advertisements/search?searchTerm=${searchTerm}`);
            }

            if (response.ok) {
                const searchResults = await response.json();
                onSearch(searchResults);
            }
        }
        catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    };

    return (
        <Box sx={{ margin: 'auto', width: '60%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #AC5FE9',
                    backgroundColor: 'black',
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
    );
}