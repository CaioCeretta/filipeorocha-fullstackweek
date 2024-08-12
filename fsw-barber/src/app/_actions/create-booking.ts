'use server'

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
  userId: string;
  serviceId: string
  date: Date
}

// Next translates this as an http route
export const createBooking = async ({serviceId, userId, date}: CreateBookingParams) => {
  const user = await getServerSession(authOptions)

  if(!user) {
    throw new Error('User not authenticated')
  }

  await db.booking.create({
    data: {serviceId, date, userId}
  })

  revalidatePath('/barbershops/[id')

}