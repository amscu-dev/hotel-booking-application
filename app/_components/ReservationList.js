"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  // Folosim useOptimistic pentru a implementa o actualizare optimistă a listei de rezervări
  // curBookings reprezintă lista actuală de rezervări
  // bookingId este ID-ul rezervării care urmează să fie șters
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, // Starea inițială (lista de rezervări)
    (curBookings, bookingId) => {
      // Functia de optimizare care actualizează lista eliminând rezervarea specificată
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  // Funcția de manipulare a ștergerii rezervării
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // Aplică optimist modificarea (șterge rezervarea din lista vizualizată)
    await deleteBooking(bookingId); // Așteaptă ca rezervarea să fie ștearsă din server
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
