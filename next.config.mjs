/** @type {import('next').NextConfig} */
// Declaram configurația pentru Next.js, care definește comportamentele aplicate în cadrul aplicației
const nextConfig = {
  images: {
    // Setăm politica de gestionare a imaginilor externe
    remotePatterns: [
      {
        protocol: "https", // Specificăm că protocolul pentru URL-ul imaginii va fi https (sigur)
        hostname: "gcdaurxqjuxkumfdazxl.supabase.co", // Domeniul de la care vor fi preluate imaginile (sursa externa)
        port: "", // Nu specificăm niciun port, pentru că este implicit folosind portul standard 443 pentru https
        pathname: "/storage/v1/object/public/cabin-images/**", // Calea către fișierele stocate pe serverul Supabase, indicând locația imaginilor cabinelor
        search: "", // Nu sunt parametri de interogare adăugați pentru URL-ul respectiv
      },
    ],
  },
};

export default nextConfig; // Exportăm configurația pentru a fi utilizată de Next.js
