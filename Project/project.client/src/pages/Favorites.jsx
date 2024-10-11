import React, { useState } from 'react';
import FavoritesList from '../components/FavoritesList';
import JobList from '../components/JobList';
import { Box } from '@mui/material';

export default function JobsPage() {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [allJobs, setAllJobs] = useState([
        { id: 1, title: 'Nettoyeur de voiture (H/F)', company: "Lav'auto", location: '66', description: 'Description...', postedDate: 'il y a 30 jours...' },
        { id: 2, title: 'Technicien (H/F)', company: "TechNet", location: '75', description: 'Description...', postedDate: 'il y a 10 jours...' },
    ]);

    const handleHeartClick = (jobId) => {
        if (favoriteItems.find(item => item.id === jobId)) {
            setFavoriteItems(favoriteItems.filter(item => item.id !== jobId));
        }
        else {
            const job = allJobs.find(item => item.id === jobId);
            if (job) setFavoriteItems([...favoriteItems, job]);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <JobList allJobs={allJobs} handleHeartClick={handleHeartClick} favoriteItems={favoriteItems} />
            <FavoritesList favoriteItems={favoriteItems} handleHeartClick={handleHeartClick} />
        </Box>
    );
}
