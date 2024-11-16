// EstacionamientoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EstacionamientoContextType {
  estacionamientoId: number | null;
  setEstacionamientoId: (id: number | null) => void;
}

const EstacionamientoContext = createContext<EstacionamientoContextType | undefined>(undefined);

export const EstacionamientoProvider = ({ children }: { children: ReactNode }) => {
  const [estacionamientoId, setEstacionamientoId] = useState<number | null>(null);

  return (
    <EstacionamientoContext.Provider value={{ estacionamientoId, setEstacionamientoId }}>
      {children}
    </EstacionamientoContext.Provider>
  );
};

export const useEstacionamiento = (): EstacionamientoContextType => {
  const context = useContext(EstacionamientoContext);
  if (!context) {
    throw new Error('useEstacionamiento must be used within an EstacionamientoProvider');
  }
  return context;
};
