"use client"; // Indică faptul că acest fișier este destinat să fie utilizat în contextul aplicației React client-side

import { createContext, useContext, useState } from "react";

// Crearea unui context pentru gestionarea stării rezervărilor
const ReservationContext = createContext();

// Starea inițială a intervalului de date (from și to sunt inițial undefined)
const initialState = { from: undefined, to: undefined };

// Provider pentru contextul de rezervare
function ReservationProvider({ children }) {
  // Starea pentru intervalul de date selectat
  const [range, setRange] = useState(initialState);

  // Starea pentru rezervarea curentă a cabanei
  const [currentCabinReservation, setCurrentCabinReservation] = useState(null);

  // Funcție pentru resetarea intervalului la valoarea inițială
  const resetRange = () => setRange(initialState);

  return (
    // Provider-ul transmite valorile contextului către componentele copii
    <ReservationContext.Provider
      value={{
        range, // Intervalul selectat
        setRange, // Funcția pentru a modifica intervalul
        resetRange, // Funcția pentru a reseta intervalul
        currentCabinReservation, // Rezervarea curentă a cabanei
        setCurrentCabinReservation, // Funcția pentru a modifica rezervarea curentă
      }}
    >
      {children} {/* Componentele copii primesc acces la context */}
    </ReservationContext.Provider>
  );
}

// Hook-ul personalizat pentru a accesa contextul de rezervare
function useReservation() {
  const context = useContext(ReservationContext); // Accesăm contextul
  // Dacă contextul nu este disponibil, aruncăm o eroare
  if (context === undefined)
    throw new Error(`Context was used outside provider`);
  return context; // Returnăm contextul pentru a fi folosit în componente
}

export { useReservation, ReservationProvider }; // Exportăm hook-ul și provider-ul pentru a fi folosite în aplicație
