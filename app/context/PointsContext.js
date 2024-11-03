import { createContext, useContext, useState } from 'react';

const PointsContext = createContext();

export function PointsProvider({ children }) {
    const [points, setPoints] = useState(0);

    const addPoints = (value) => {
        setPoints((prevPoints) => prevPoints + value);
    };

    return (
        <PointsContext.Provider value={{ points, addPoints }}>
            {children}
        </PointsContext.Provider>
    );
}

export function usePoints() {
    return useContext(PointsContext);
}
