import { auth } from "./app/_lib/auth";
// Middleware-ul este folosit pentru a proteja ruta "/account"
// Dacă utilizatorul nu este autentificat, va fi redirecționat (sau va primi o eroare)
// Funcția `auth` va gestiona logica de verificare a autentificării utilizatorului.
export const middleware = auth;

// Configurăm matcher-ul pentru a aplica acest middleware doar pentru rutele care încep cu "/account".
// Aceasta înseamnă că logica de autentificare va fi folosită doar pentru această rută.
export const config = {
  matcher: ["/account"], // Se aplică doar la ruta "/account"
};
