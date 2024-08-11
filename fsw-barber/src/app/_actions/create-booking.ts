'use server'

import { db } from "../_lib/prisma";

interface CreateBookingParams {
  userId: string;
  serviceId: string
  date: Date
}

export const createBooking = async ({serviceId, userId, date}: CreateBookingParams) => {

  await db.booking.create({
    data: {serviceId, userId, date}
  })


}