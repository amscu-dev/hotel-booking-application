"use client";
"use client"; // Aceasta marchează componenta ca fiind una care rulează pe client (browser), nu pe server

// Componenta Error gestionează erorile care apar în timpul renderizării React (Error Boundary)
// Parametrii:
//  - `error`: obiectul care conține detalii despre eroare (mesajul de eroare etc.)
//  - `reset`: funcția care resetează starea erorii (poate fi apelată pentru a încerca să renderizezi din nou componenta)
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      {/* Titlu care indică faptul că a apărut o eroare */}
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>

      {/* Afișăm mesajul erorii care poate fi accesat prin `error.message` */}
      <p className="text-lg">{error.message}</p>

      {/* Buton pentru a permite utilizatorului să încerce din nou (trigger funcția `reset`) */}
      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
