import { useSession } from "next-auth/react";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if(!session) {
    return notFound()
  }

  if(!session.user) {
    //TO DO show a login pop up
    return notFound();
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lt: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  

  return (
    <>
      <Header />
      <div className="p-5 space-y-3">
        <h1 className="font-bold text-xl">Bookings</h1>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Confirmed
        </h2>
        {confirmedBookings.map(booking => <BookingItem booking={booking} key={booking.id} />)}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Concluded
        </h2>
        {concludedBookings.map(booking => <BookingItem booking={booking} key={booking.id} />)}
      </div>
    </>
  );
}
 
export default Bookings;