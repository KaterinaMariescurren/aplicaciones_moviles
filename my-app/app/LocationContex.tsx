import React, { createContext, useContext, useState } from 'react';

type Location = { latitude: number; longitude: number };
type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location | null) => void; // Acepta null
};

// Crear el contexto de la ubicación
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Proveedor de contexto
export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation debe ser usado dentro de un LocationProvider");
  }
  return context;
}
