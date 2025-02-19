import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

// Definim fontul "Josefin Sans" pentru întreaga aplicație
const josefin = Josefin_Sans({
  subsets: ["latin"], // Specificăm subsetul fontului (caractere latine)
  display: "swap", // Specificăm modul de încărcare al fontului (swap înseamnă că fontul va fi înlocuit pe măsură ce este disponibil)
});

// Metadatele pentru pagina principală
export const metadata = {
  title: {
    template: "%s / Stay Cabin", // Folosim un template pentru titlu, înlocuind %s cu titlul paginii specifice
    default: "Welcome / Stay Cabin", // Titlul implicit pentru aplicație
  },
  description: "Luxurious cabin hotel", // Descrierea aplicației
};

// Layout-ul rădăcină (RootLayout) al aplicației
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {/* Putem folosi context API aici pentru ca server components vor fi primite ca children prop */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
