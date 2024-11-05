// contexts/ActivityContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Activity {
    title: string;
    description?: string;
    importance: string;
    date: string;
    time: string;
}

interface ActivityContextProps {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
}

const ActivityContext = createContext<ActivityContextProps | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    const addActivity = (activity: Activity) => {
        setActivities((prevActivities) => [...prevActivities, activity]);
    };

    return (
        <ActivityContext.Provider value={{ activities, addActivity }}>
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
