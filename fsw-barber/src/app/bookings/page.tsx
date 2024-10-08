import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { getConcludedBookings } from "../_data/get-concluded-bookints";
import { getConfirmedBookings } from "../_data/get-confirmed-bookints";

const Bookings = async () => {

  const concludedBookings = await getConcludedBookings()

  const confirmedBookings = await getConfirmedBookings()

  return (
    <>
      <Header />
      <div className="p-5 space-y-3">
        {confirmedBookings.length === 0 && getConcludedBookings.length === 0 && (
          <p className="text-gray-400">You do not have any booking</p>
        )}
        
        <h1 className="font-bold text-xl">Bookings</h1>
        {confirmedBookings.length > 0 && (
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
            {concludedBookings.map(booking => <BookingItem booking={JSON.parse(JSON.stringify(booking))} key={booking.id} />)}
          </>
        )}
      </div>
    </>
  );
}

export default Bookings;