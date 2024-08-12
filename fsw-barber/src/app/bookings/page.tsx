import { useSession } from "next-auth/react";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if(!session) {
    return notFound()
  }

  if(!session.user) {
    //TO DO show a login pop up
    return notFound();
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id
    }
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="font-bold text-xl">Bookings</h1>
      </div>
    </>
  );
}
 
export default Bookings;