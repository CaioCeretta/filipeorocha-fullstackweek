import { useSession } from "next-auth/react";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";
import getConfirmedBookings from "../_data/get-confirmed-bookints";
import { getConcludedBookings } from "../_data/get-concluded-bookints";

const Bookings = async () => {

  const concludedBookings = await getConcludedBookings()

  const confirmedBookings = await getConfirmedBookings()



  return (
    <>
      <Header />
      <div className="p-5 space-y-3">
        <h1 className="font-bold text-xl">Bookings</h1>
        {getConfirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmed
            </h2>
            {confirmedBookings!.map((booking) => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Concluded
            </h2>
            {concludedBookings.map(booking => <BookingItem booking={booking} key={booking.id} />)}
          </>
        )}
      </div>
    </>
  );
}

export default Bookings;