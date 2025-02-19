import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"; // Importă funcțiile care vor obține informațiile despre cabină și datele rezervate

// Funcția GET pentru a manipula cererea HTTP GET
export async function GET(request, { params }) {
  const { cabinId } = params; // Extrage cabinId din parametrii URL-ului

  try {
    // Folosim Promise.all pentru a obține simultan cabină și datele rezervate
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId), // Obține detalii despre cabină
      getBookedDatesByCabinId(cabinId), // Obține datele rezervate pentru cabină
    ]);

    // Returnează un răspuns JSON cu informațiile obținute
    return Response.json({ cabin, bookedDates }); // Corect: răspunsul trebuie să fie un obiect JSON
  } catch (error) {
    // În cazul unui error, returnăm un mesaj de eroare
    return Response.json(
      { message: "Cabin not found", error: error.message },
      { status: 404 }
    ); // Eroare cu status 404
  }
}
