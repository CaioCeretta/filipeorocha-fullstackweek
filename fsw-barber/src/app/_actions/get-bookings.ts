import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string,
  date: Date
}


export const getBookings = ({serviceId, date}: GetBookingsProps) => {
//In this case we can remove the async because it will return a promise
//we will already await when we call this function, so it would be redundant

  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    }
  })

}