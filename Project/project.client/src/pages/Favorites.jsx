import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesList from '../components/FavoritesList';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { Box, Typography, Grid, Menu, MenuItem } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useVerificationToken } from '../hooks/useVerificationToken';
import { AppContext } from '../context/AppContext.jsx';

export default function Favorites() {

    useVerificationToken();
    const { idPeople } = useContext(AppContext);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [allJobs, setAllJobs] = useState('');
    const [selectedAd, setSelectedAd] = useState(null);
    const [likedItems, setLikedItems] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleHeartClick = async (id) => {
        const updatedLikes = [...likedItems];
        const index = favoriteItems.findIndex((item) => item.id === id);

        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);

        if (!updatedLikes[index]) {
            try {
                const response = await fetch(`https://localhost:7007/api/favorites/page/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression du favori');
                }

                setFavoriteItems((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
            }
            catch (error) {
                console.error("Erreur lors de la suppression du favori :", error);
            }
        }
    }; 

    const handleNavProfil = async () => {
        try {
            const response = await fetch("https://localhost:7007/api/Profil", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idPeople }),
            });
            if (response.ok) {
                const user = await response.json();
                navigate('/profil', { state: { user } });
            }
        } catch (error) {
            console.log("Erreur lors du chargement du profil.");
        }
    };

    const handleNavSignIn = () => {
        const disconnect = async () => {
            try {
                const response = await fetch("https://localhost:7007/api/Home/disconnect", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({ idPeople }),
                });

                if (response.ok) {
                    setIdPeople(0);
                    navigate('/');
                }
            } catch (error) {
                console.log("Erreur lors de la déconnexion.");
            }
        };

        disconnect();
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`https://localhost:7007/api/favorites/items?userId=${idPeople}`);

                if (response.ok) {
                    const data = await response.json();
                    setFavoriteItems(data);

                    const initialLikes = data.map(() => true);
                    setLikedItems(initialLikes);
                }
            } catch (error) {
                console.error("Erreur lors de la r�cup�ration des favoris :", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '83vw', backgroundColor: '#1e1E1E', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: '10px' }}>
                    FAVORIS
                </Typography>

                <Person sx={{ color: '#AC5FE9', marginLeft: 2, cursor: 'pointer' }} onClick={handleMenuClick} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'black',
                            color: 'violet',
                        },
                    }}
                >
                    <MenuItem onClick={handleNavProfil} sx={{ color: 'violet' }}>Profil</MenuItem>
                    <MenuItem onClick={handleNavSignIn} sx={{ color: 'violet' }}>Se déconnecter</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Grid container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 40px 0 40px' }}>
                    <FavoritesList favoriteItems={favoriteItems} handleHeartClick={handleHeartClick} likedItems={likedItems} onAdSelect={setSelectedAd} />
                    <JobDetails selectedAd={selectedAd} />
                </Grid>
            </Box>
        </Box>
    );
}
