import Search from "../_components/search";
import BarberShopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import search from "../_components/search";
import { title } from "process";

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams: { title, service } }: BarbershopsPageProps) => {

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        title ? {
          name: {
            contains: title,
            mode: 'insensitive'
          }
        } : {},
        service ? {
          services: {
            some: {
              name: {
                contains: service,
                mode: 'insensitive'
              }
            }
          }
        } : {}
      ]
    }
  })

  return (

    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Results for &quot;{title || service}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map(barberShopItem => (
            <BarberShopItem barbershop={barberShopItem} />
          ))}

        </div>
      </div>
    </>
  );
}

export default BarbershopsPage;