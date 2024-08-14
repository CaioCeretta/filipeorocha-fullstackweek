'use client'

import { useSession } from "next-auth/react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function getConfirmedBookings() {

  const session = await getServerSession(authOptions)

  if (!session) return


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