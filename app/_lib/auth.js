import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    // Configurarea provider-ului Google pentru autentificare
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Callback de autorizare: Verifică dacă utilizatorul este autentificat
    authorized({ auth, request }) {
      return !!auth?.user; // Permite accesul doar dacă utilizatorul este autentificat
    },

    // Callback de signIn: Verificăm dacă există deja un guest cu email-ul utilizatorului
    // Dacă nu există, creăm unul nou
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email); // Căutăm guest-ul existent
        if (!existingGuest) {
          // Dacă nu există, creăm un nou guest
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true; // Continuăm cu procesul de autentificare
      } catch {
        return false; // Dacă apare o eroare, refuzăm autentificarea
      }
    },

    // Callback de session: Atașăm ID-ul guest-ului la sesiune
    async session({ session, user }) {
      const guest = await getGuest(session.user.email); // Obținem guest-ul după email
      session.user.guestId = guest.id; // Atașăm ID-ul guest-ului în sesiune

      return session; // Returnăm sesiunea actualizată
    },
  },

  // Paginile personalizate pentru autentificare
  pages: {
    signIn: "/login", // Redirecționare către pagina de login personalizată
  },
};

// Exportăm handlerii pentru NextAuth
export const {
  auth, // Funcție de autentificare
  signIn, // Funcție de semnare
  signOut, // Funcție de deconectare
  handlers: { GET, POST }, // Gestionăm cererile GET și POST
} = NextAuth(authConfig);
