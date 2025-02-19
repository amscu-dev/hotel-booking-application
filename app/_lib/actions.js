"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// Sign-in action
export async function signInAction() {
  // 1. Autentificare - Se folosește Google pentru a autentifica utilizatorul
  await signIn("google", { redirectTo: "/account" });
}

// Sign-out action
export async function signOutAction() {
  // 1. Deconectare - Se deconectează utilizatorul și se redirecționează la pagina principală
  await signOut({ redirectTo: "/" });
}

// Update guest information
export async function updateGuest(formData) {
  // 1. Autentificare - Verificăm dacă utilizatorul este logat
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Validare date - Verificăm validitatea National ID
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^\d{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID (6 to 12 digits)");
  }

  // 3. Actualizare date - Actualizăm datele utilizatorului în tabela "guests"
  const updataData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updataData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  // 4. Revalidare cache - Revalidăm cache-ul pentru profilul utilizatorului
  revalidatePath("/account/profile");
}

// Delete booking
export async function deleteBooking(bookingId) {
  // 1. Autentificare - Verificăm dacă utilizatorul este logat
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Autorizare - Verificăm dacă utilizatorul are permisiunea de a șterge rezervarea
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to perform this action");

  // 3. Ștergere - Ștergem rezervarea din tabela "bookings"
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("Booking could not be deleted");

  // 4. Revalidare cache - Revalidăm calea "/account/reservations"
  revalidatePath("/account/reservations");
}

// Update booking
export async function updateBooking(formData) {
  // 1. Autentificare - Verificăm dacă utilizatorul este logat
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Autorizare - Verificăm dacă utilizatorul poate modifica această rezervare
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to perform this action");

  // 3. Mutare - Actualizăm rezervarea în baza de date
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  // 4. Revalidare cache - Revalidăm căile pentru rezervări
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 5. Redirect - După actualizare, redirecționăm utilizatorul
  redirect("/account/reservations");
}

// Create booking
export async function createBooking(bookingData, formData) {
  // 1. Autentificare - Verificăm dacă utilizatorul este logat
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Creare rezervare - Adăugăm o rezervare nouă în baza de date
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  // 3. Revalidare cache - Revalidăm calea pentru cabină
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  // 4. Redirect - După crearea rezervării, redirecționăm utilizatorul
  redirect("/cabins/thankyou");
}
