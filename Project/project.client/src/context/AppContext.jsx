import React, { createContext, useState } from 'react';

// Créer le contexte
export const AppContext = createContext();

// Fournisseur de contexte
export const AppProvider = ({ children }) => {
    const [idPeople, setIdPeople] = useState(0);

    return (
        <AppContext.Provider value={{ idPeople, setIdPeople }}>
            {children}
        </AppContext.Provider>
    );
};