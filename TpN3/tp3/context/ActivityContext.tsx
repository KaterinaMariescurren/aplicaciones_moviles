// contexts/ActivityContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface Activity {
    id: string;
    title: string;
    description?: string;
    importance: string;
    date: string;
    time: string;
    completed: boolean;
}

interface ActivityContextProps {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    markActivityCompleted: (id: string) => void;  // Función para marcar como completada
    removeActivity: (id: string) => void;  // Función para eliminar una actividad
}

const ActivityContext = createContext<ActivityContextProps | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    const addActivity = (activity: Activity) => {
        setActivities((prevActivities) => [...prevActivities, activity]);
    };

    const markActivityCompleted = (id: string) => {
        setActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === id ? { ...activity, completed: !activity.completed } : activity
            )
        );
    };

    const removeActivity = (id: string) => {
        setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== id));
    };

    return (
        <ActivityContext.Provider
        value={{ activities, addActivity, markActivityCompleted, removeActivity }}
        >
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivityContext = () => {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error('useActivityContext must be used within an ActivityProvider');
    }
    return context;
};
