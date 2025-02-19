import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// Exporting dynamic metadata
// Generarea metadatelor pentru pagină pe baza parametrului cabinId din URL
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId); // Obținem detalii despre cabană
  return {
    title: `Cabin ${name}`, // Setăm titlul paginii cu numele cabanei
  };
}

// Generating static rendering for dynamic routes
// Această funcție generează parametrii pentru rutele dinamice folosind datele din baza de date
export async function generateStaticParams() {
  const cabins = await getCabins(); // Obținem toate cabanele
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) })); // Creăm o listă de cabinId pentru fiecare cabină

  return ids; // Returnăm parametrii pentru rutele statice
}

// Pagina principală care va afișa informațiile despre o cabină și opțiunea de rezervare
export default async function Page({ params }) {
  // v1 - încet: Obținem datele despre cabină și rezervările asociate
  // const cabin = await getCabin(params.cabinId); // Comentat pentru performanță
  // const settings = await getSettings(); // Comentat pentru performanță
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId); // Comentat pentru performanță

  // v2 - mai rapid: Folosim Promise.all pentru a obține mai multe date în paralel (comentat pentru optimizare)
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]); // Îmbunătățim performanța obținând datele în paralel

  // v3 - optimizat: Înlocuim cererea de date pentru settings și bookedDates pentru a utiliza componente server separate (cel mai rapid)
  const cabin = await getCabin(params.cabinId); // Obținem detalii doar despre cabana curentă

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve today. Pay on arrival.{" "}
        </h2>

        {/* Granular streaming: activăm Suspense pentru a permite încărcarea parțială a componentelor */}
        {/* Dacă datele din componenta Reservation nu sunt gata, se va arăta un spinner */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
