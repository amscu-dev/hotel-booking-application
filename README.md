# Hotel Booking Application

## Descriere

Stay Cabin este o aplicație web modernă pentru gestionarea rezervărilor și profilurilor utilizatorilor . Aplicația oferă o experiență ușor de utilizat pentru gestionarea rezervărilor, vizualizarea cabinelor disponibile, actualizarea profilului utilizatorilor și interacțiunea cu un sistem de rezervări în timp real.

## Tehnologii Utilizate

- **Frontend**:

  - **React 18** – Framework JavaScript pentru construirea interfețelor interactive.
  - **Next.js 14** – Framework React pentru renderizare server-side, optimizări de performanță și routing dinamic.
  - **TailwindCSS** – Framework CSS utilitar pentru design rapid și responsive.
  - **Next-Auth** – Soluție completă pentru autentificare utilizând OAuth, token-uri și sesiuni.
  - **React Day Picker** – Bibliotecă pentru selecția datelor într-un calendar.
  - **date-fns** – Bibliotecă pentru formatarea și manipularea datelor într-un mod simplu și eficient.

- **Backend**:

  - **Supabase** – Platformă backend as a service bazată pe PostgreSQL pentru gestionarea datelor și autentificarea utilizatorilor.

- **React Server Components (RSC)**:

  - Renderizare pe server pentru a reduce dimensiunea bundle-ului și a îmbunătăți performanța, trimițând doar componentele esențiale pe client.
  - **Dynamic Imports** – Încărcarea componentelor doar când sunt necesare, îmbunătățind timpul de încărcare.

- **Autentificare și Autorizare**:
  - **Supabase Authentication** – Flux complet de autentificare utilizând email și parolă, gestionarea sesiunilor și protecția resurselor.
  - **Middleware pentru protecția rutei** – Folosirea middleware pentru protecția rutelor sensibile (de exemplu, pagina de cont utilizator).

## Funcționalități

- **Managementul Profilului Utilizatorului**:

  - Actualizarea profilului utilizatorului (inclusiv informații personale și naționalitate).
  - Sistem de autentificare și autorizare bazat pe OAuth prin Google Provider.

- **Gestionarea Rezervărilor**:

  - Vizualizarea rezervărilor anterioare și a celor viitoare.
  - Rezervarea de cabine cu plăți efectuate la sosire.
  - Vizualizarea detaliilor cabinelor și a disponibilității acestora.

- **Interfață Ușor de Utilizat**:
  - Filtrarea cabinelor după capacitate pentru o experiență personalizată a utilizatorului.

## Arhitectura Aplicației

1. **Client-Side**:
   - Interfață React utilizând componente funcționale.
   - Gestionează starea aplicației cu ajutorul Context API și React hooks.
2. **Server-Side**:

   - Utilizare a Next.js pentru server-side rendering și static site generation.
   - Crearea de rute dinamice pentru gestionarea cabinelor și a rezervărilor.
   - Streaming de date pentru un loading mai rapid al componentelor (folosind `Suspense` și `React.lazy`).

3. **Baza de Date**:

   - **Supabase** pentru gestionarea utilizatorilor și a rezervărilor.

4. **Autentificare și Autorizare**:
   - Autentificarea utilizatorilor utilizând **Auth.js** cu **Google OAuth provider**.
   - Protejarea rutelor private (de exemplu, pagina de profil utilizator) folosind middleware.

## Instalare

1. Clonează repository-ul:

   ```bash
   git clone https://github.com/amscu/hotel-booking-aplication.git
   ```

2. Navighează în directorul proiectului:

   ```bash
   cd stay-cabin
   ```

3. Instalează dependențele:
   ```bash
   npm install
   ```
4. Creează un fișier .env și adaugă variabilele de mediu necesare:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<url_supabase>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_supabase>
   NEXTAUTH_SECRET=<nextauth_secret>
   GOOGLE_CLIENT_ID=<google_client_id>
   GOOGLE_CLIENT_SECRET=<google_client_secret>
   ```
5. Rulează aplicația în mod de dezvoltare:
   ```bash
   npm run dev
   ```
