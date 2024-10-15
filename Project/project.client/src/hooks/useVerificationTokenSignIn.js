import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

export function useVerificationTokenSignIn() {
    const { idPeople, setIdPeople } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (idPeople == 0) {
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
                            setIdPeople(data.idPeople);
                            // Redirection vers la page d'accueil
                            navigate('/home');
                        }
                    }
                    catch {
                        console.log("error token");
                    }
                };

                verifyToken();
            }
        }  
    }, [navigate]);
} 