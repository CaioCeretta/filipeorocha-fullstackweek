"use server"

import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export const getConfirmedBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []


  return db.booking.findMany({
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

}