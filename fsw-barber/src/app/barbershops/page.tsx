import Search from "../_components/search";
import BarberShopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams: { search } }: BarbershopsPageProps) => {

  const barbershops = await db.barbershop.findMany(
    {
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    }
  )

  return (

    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Results for &quot;{search}&quot;
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