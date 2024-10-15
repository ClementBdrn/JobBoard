import React, { useState, useEffect } from 'react';
import FavoritesList from '../components/FavoritesList';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { Box } from '@mui/material';
import { useVerificationToken } from '../hooks/useVerificationToken';

export default function Favorites() {
    useVerificationToken();
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [allJobs, setAllJobs] = useState('');

    // �tat pour les likes
    const [likedItems, setLikedItems] = useState([]);

    const handleHeartClick = async (id) => {
        const updatedLikes = [...likedItems];
        const index = favoriteItems.findIndex((item) => item.id === id);

        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);
        console.log(id);

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

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('https://localhost:7007/api/favorites');

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setFavoriteItems(data);

                    // Initialiser l'�tat likedItems avec les favoris actuels
                    const initialLikes = data.map(() => true);
                    setLikedItems(initialLikes);
                }
            } catch (error) {
                console.error("Erreur lors de la r�cup�ration des favoris :", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FavoritesList favoriteItems={favoriteItems} handleHeartClick={handleHeartClick} likedItems={likedItems} />
            <JobDetails />
        </Box>
    );
}
