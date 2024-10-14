import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useVerificationToken() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const verifyToken = async () => {
                try {
                    const response = await fetch("https://localhost:7007/api/SignIn/verifyToken", {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        // Redirection vers la page d'accueil
                        navigate('/');
                    }
                }
                catch {
                    console.log("error token");
                }
            };

            verifyToken();
        } else {
            navigate('/');
        }
    }, [navigate]);
}