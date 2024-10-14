import React, { useState, useEffect } from 'react';
import FavoritesList from '../components/FavoritesList';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { Box } from '@mui/material';

export default function JobsPage() {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [allJobs, setAllJobs] = useState('');

    // �tat pour les likes
    const [likedItems, setLikedItems] = useState([]);

    // Fonction pour g�rer le clic sur le c�ur
    const handleHeartClick = async (index) => {
        const updatedLikes = [...likedItems];
        updatedLikes[index] = !updatedLikes[index];
        setLikedItems(updatedLikes);

        const ad = advertisements[index];
        if (updatedLikes[index]) {
            try {
                const response = await fetch('https://localhost:7007/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: idPeople,
                        adId: ad.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout aux favoris');
                }

                // Optionnel : Traitez la r�ponse si n�cessaire
                const result = await response.json();
                console.log('Favori ajout� :', result);
            }
            catch (error) {
                console.error("Erreur lors de l'ajout aux favoris :", error);
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
                }
            }
            catch (error) {
                console.error("Erreur lors de la r�cup�ration des favorites :", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FavoritesList favoriteItems={favoriteItems} handleHeartClick={handleHeartClick} />
            <JobDetails />
        </Box>
    );
}
