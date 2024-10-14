import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useVerificationTokenSignIn() {
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

                    if (response.ok) {
                        const data = await response.json();
                        const idPeople = data.idPeople;
                        // Redirection vers la page d'accueil
                        navigate('/home', { state: { idPeople } });
                    }
                }
                catch {
                    console.log("error token");
                }
            };

            verifyToken();
        }
    }, [navigate]);
} 